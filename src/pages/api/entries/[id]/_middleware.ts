// @scripts
import { NextRequest, NextResponse } from 'next/server';

const middleware = (req: NextRequest) => {
  const id = req.page?.params?.id!;
  const checkMongoIDRegExp = /^[0-9a-fA-F]{24}$/;

  if (id && !checkMongoIDRegExp.test(id as string)) {
    return new Response(JSON.stringify({ message: `The id is not correct: ${id}` }), {
      status: 400,
      headers: {
        'Content-Type': 'aplication/json',
      },
    });
  }

  return NextResponse.next();
};

export default middleware;
