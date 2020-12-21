function NumberList({numbers}) {
  console.log(numbers);
  const listItems = numbers.map((number, index) => {
    return (
    <tr key={index+1}>
          <th scope="row">{index +1}</th>
          <td>{number.name}</td>
          <td>{number.email}</td>
          <td>{number.contact}</td>
        </tr>
    )
  });

  return (
        <table className="table table-striped border-0">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Contact</th>
            </tr>
          </thead>
          <tbody>
               {listItems}
          </tbody>
      </table>
   );
  }


axios.get('http://localhost:5000/user/' + localStorage.getItem('email'))
.then(result => {
    ReactDOM.render(
      <NumberList numbers={result.data} />,
      document.getElementById('root')
    );
}).catch(err => {
    console.log(err);
});

