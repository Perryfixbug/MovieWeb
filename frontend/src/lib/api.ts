const URL = process.env.NEXT_PUBLIC_SERVER_URL

export async function fetchServer(endpoint: string, method='GET', body?: any, header?: any ){
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
    return await res.json()
  }catch(err: any){
    throw err
  }
}

export async function fetchClient(endpoint: string, method='GET', body?: any, header?: any ) {
  const accessToken = localStorage.getItem("accessToken")
  if(!accessToken){
    return "Hãy đăng nhập để dùng chức năng này"
  }

  try{
    const res = await fetch(`${URL}${endpoint}`, {
      method,
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        ...header
      },
      body: body && method !== 'GET' ?  JSON.stringify(body) : undefined
    })

    //token hết hạn -> refresh
    if(res.status == 401 && endpoint!='/refresh'){
      const refreshRes = await fetch(`${URL}/refresh`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if(!refreshRes.ok){
        throw new Error("Phiên làm việc đã hết hạn, vui lòng đăng nhập lại")
      }
      const {accessToken: accessToken} = await refreshRes.json()
      localStorage.setItem("accessToken", accessToken)
      return fetchClient(endpoint, method, body, header)
    }
    
    if(!res.ok){
      throw new Error("Lỗi")
    }

    return await res.json()
  }catch(err: any){
    throw err
  }
}