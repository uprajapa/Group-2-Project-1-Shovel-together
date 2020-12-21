function NumberList({numbers}) {
  console.log(numbers);
  const listItems = numbers.map((number, index) => {
    console.log(number);
    return (
    <tr key={index}>
          <th scope="row">{index}</th>
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



//    return <li id={"person-" + index} key={"person-" + index} class="list-group-item list-group-item-action">
//        <div class="row">
//            <div class="col-md-6">{number.name}</div>
//            <div class="col-md-3">{number.email}</div>
//            <div class="col-md-3">{number.contact}</div>
//         </div>
//    </li>}
//  );
//  return (
//    <ul class="list-group list-group-flush">
//        <div class="row">
//            <div class="col-md-6"><h5>Name</h5></div>
//            <div class="col-md-3"><h5>Email</h5></div>
//            <div class="col-md-3"><h5>Contact Number</h5></div>
//         </div>
//        {listItems}
//    </ul>
//  );
//}

 axios.get('http://localhost:5000/user/' + localStorage.getItem('email'))
    .then(result => {
        console.log(result)
        ReactDOM.render(
          <NumberList numbers={result.data} />,
          document.getElementById('root')
        );
    }).catch(err => {
        console.log(err);
    });

