fetch("data.json")
  .then(res => res.json())
  .then(data => {

    const promises = data.promises;

    const total = promises.length;
    const completed = promises.filter(p => p.status === "completed").length;
    const inProgress = promises.filter(p => p.status === "in_progress").length;
    const pending = promises.filter(p => p.status === "pending").length;

    document.getElementById("totalPromises").textContent = total;
    document.getElementById("completedPromises").textContent = completed;
    document.getElementById("activePromises").textContent = inProgress;
    document.getElementById("pendingPromises").textContent = pending;

    const score = Math.round(
      ((completed + (inProgress * 0.5)) / total) * 100
    );

    document.getElementById("accountabilityScore").textContent =
      score + "%";

    const progressContainer =
      document.getElementById("majorPromises");

    promises
      .filter(p => p.target_value !== undefined)
      .slice(0, 5)
      .forEach(p => {

        let pct = 0;

        if (
          p.target_value &&
          p.current_value !== null &&
          p.target_value > 0
        ) {
          pct = Math.round(
            (p.current_value / p.target_value) * 100
          );
        }

        progressContainer.innerHTML += `
          <div class="goal-card">

            <div class="goal-title">
              ${p.promise}
            </div>

            <div class="goal-percent">
              ${pct}%
            </div>

            <div class="progress-bar">
              <div
                class="progress-fill"
                style="width:${pct}%">
              </div>
            </div>

          </div>
        `;
      });

    const table =
      document.getElementById("promiseTable");

    promises.forEach(p => {

      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${p.promise}</td>
        <td>${p.category}</td>
        <td>
          <span class="badge ${p.status}">
            ${p.status.replace("_"," ")}
          </span>
        </td>
        <td>${p.target_deadline || "-"}</td>
      `;

      table.appendChild(row);

    });

  });
