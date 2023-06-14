const fetchSuggestionFromChatGPT = async () => {
  const res = await fetch("/api/generateSuggestion", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
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
export default fetchSuggestionFromChatGPT;
