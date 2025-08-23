const URL = process.env.NEXT_PUBLIC_SERVER_URL

export async function fetchAPI(endpoint: string, method='GET', body?: any, header?: any, ){
  try{
    const res = await fetch(`${URL}${endpoint}`, {
      method,
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
        ...header
      },
      body: body && method !== 'GET' ?  JSON.stringify(body) : undefined
    })
    const data = res.json()
    return data
  }catch(err: any){
    throw err
  }
}