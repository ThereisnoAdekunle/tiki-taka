import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    const waitlistPath = path.join(process.cwd(), 'data', 'waitlist.json');
    const dataDir = path.dirname(waitlistPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    let waitlist = [];
    if (fs.existsSync(waitlistPath)) {
      const fileContent = fs.readFileSync(waitlistPath, 'utf-8');
      waitlist = JSON.parse(fileContent);
    }

    if (waitlist.some((entry: any) => entry.email === email)) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    const newEntry = {
      email,
      timestamp: new Date().toISOString(),
      id: Date.now().toString()
    };

    waitlist.push(newEntry);
    fs.writeFileSync(waitlistPath, JSON.stringify(waitlist, null, 2));

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully joined waitlist!',
        totalMembers: waitlist.length
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Waitlist submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fullData = searchParams.get('full') === 'true';

    const waitlistPath = path.join(process.cwd(), 'data', 'waitlist.json');
    
    if (!fs.existsSync(waitlistPath)) {
      return NextResponse.json(
        fullData ? { waitlist: [], count: 0 } : { count: 0 },
        { status: 200 }
      );
    }

    const fileContent = fs.readFileSync(waitlistPath, 'utf-8');
    const waitlist = JSON.parse(fileContent);

    if (fullData) {
      return NextResponse.json(
        { waitlist, count: waitlist.length },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { count: waitlist.length },
      { status: 200 }
    );

  } catch (error) {
    console.error('Waitlist fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
