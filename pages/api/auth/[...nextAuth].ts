// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ACCESS_TOKEN_KEY, HTTP_METHOD_GET, HTTP_METHOD_POST } from '@/utils/constant';
import { clearCookie, setCookie } from '@/utils/cookiesUtil';
import httpClient from '@/utils/httpClient';
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const action = req.query["nextAuth"][0];
  if (req.method === HTTP_METHOD_POST && action === "signin") {
    return signin(req, res);
  } else if (req.method === HTTP_METHOD_GET && action === "signout") {
    return signOut(req, res);
  } else if (req.method === HTTP_METHOD_GET && action === "session") {
    return getSession(req, res);
  } else {
    return res
      .status(405)
      .end(`Error: HTTP ${req.method} is not supported for ${req.url}`);
  }
}
async function signin(req: NextApiRequest, res: NextApiResponse) {
  try {


    const response = await httpClient.post('/authen/login', req.body)
    const { token } = response.data
    setCookie(res, ACCESS_TOKEN_KEY, token), {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    }
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    res.json({ error })

  }
}

function signOut(req: NextApiRequest, res: NextApiResponse<any>) {
  clearCookie(res, ACCESS_TOKEN_KEY);
  res.json({ result: "ok" });
}
function getSession(req: NextApiRequest, res: NextApiResponse) {
  res.send({ message: 'session' })
}

