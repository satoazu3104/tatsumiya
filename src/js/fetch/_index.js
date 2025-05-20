function fetchData() {
  const url = ajax_obj.ajaxurl;
  // console.log(url);
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'action=fetch_data_callback'
  })
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      let count = data.regist_count[1];
      let elm = document.getElementById('regist_count');
      elm.innerText = count;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

fetchData();