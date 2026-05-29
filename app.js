fetch("data.json")
  .then(response => response.json())
  .then(data => {

    const table = document.getElementById("promiseTable");

    data.promises.forEach(promise => {

      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${promise.promise}</td>
        <td>${promise.category}</td>
        <td class="${promise.status}">
          ${promise.status}
        </td>
        <td>${promise.target_deadline || ""}</td>
        <td>${promise.last_update || ""}</td>
      `;

      table.appendChild(row);
    });

  });
