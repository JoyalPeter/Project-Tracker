export default async function makeApiCall(
  path,
  method,
  body=null
) {
  const url = import.meta.env.VITE_BASEURL+ path;
  const token = localStorage.getItem("jwtToken");
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : null,
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `${errorData.statusCode || "Unknown status"}: ${errorData.message || "Unknown error"}`
    );
  } else {
    return await response.json();
  }
}
