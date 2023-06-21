const fetchImageFormDallE = async (prompt: any) => {
  const res = await fetch("/api/getImage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  const dataGPT = await res.json();
  return dataGPT.trim();
};

/**
fetch("/api/generateSuggestion", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  }).then((res) => {
    res.json();
    console.log("****");
    console.log(res);
  });
*/
export default fetchImageFormDallE;
