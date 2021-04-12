const getHeaders = headers => {
  //console.log(products)
  let headerResult = "";

  if (headers.length) {
    headerResult = headers.map(header => {
      return `<th>${header}</th>`;
    }).join("");
    headerResult = `<tr>${headerResult}</tr>`;
  } else {
    headerResult = 'No headers data!';
  }

  return headerResult;
};
