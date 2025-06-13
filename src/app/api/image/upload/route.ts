import {put} from '@vercel/blob';

export async function POST(request: Request): Promise<NextResponse> {
  const {searchParams} = new URL(request.url);
  const fileName = searchParams.get('fileName');

  if (!fileName) {
    return new Response('File name is required', {status: 400});
  }

  const blob = await put(fileName, request.body, {
    access: 'public'
  });

  return NextResponse.json(blob);

}