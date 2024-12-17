const url = "http://localhost:4000";
autoLogin();
async function autoLogin() {
  const accessToken = localStorage.getItem("accessToken");
  const user = await customAutologinFetch(accessToken);
  console.log(user);
  if (user) {
    document.getElementById("login-page").style.display = "none";
    if (user.role === "ADMIN") {
      document.getElementById("admin-dashboard").style.display = "flex";
    } else if (user.role === "OPERATOR") {
      document.getElementById("operator-dashboard").style.display = "flex";
    }
  }
}
async function customAutologinFetch(accessToken) {
  try {
    const resultJson = await fetch(url + "/user/autologin", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return resultJson.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}
async function customPostFetch(apiPath, body) {
  try {
    const resultJson = await fetch(url + apiPath, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(body),
    });
    return resultJson.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}
// "/user/login"
document
  .getElementById("login-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    try {
      const result = await customPostFetch("/user/login", { email, password });
      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);
      autoLogin();
    } catch (error) {
      console.log(error);
    }
    //   const role = document.getElementById("login-email").value;

    //   // Hide the login page

    //   // Show the appropriate dashboard based on role
  });

// Switch between admin forms
document
  .getElementById("show-register-user")
  .addEventListener("click", function () {
    document.getElementById("register-user-form").style.display = "block";
    document.getElementById("manage-services-form").style.display = "none";
  });

document
  .getElementById("show-manage-services")
  .addEventListener("click", function () {
    document.getElementById("manage-services-form").style.display = "block";
    document.getElementById("register-user-form").style.display = "none";
  });

// Manage services (Add/Edit/Delete)
const services = [];

document
  .getElementById("add-service-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const serviceName = document.getElementById("service-name").value;
    services.push(serviceName);
    updateServiceList();
    document.getElementById("service-name").value = "";
  });

function updateServiceList() {
  const serviceList = document.getElementById("service-list");
  serviceList.innerHTML = "";

  services.forEach((service, index) => {
    const serviceItem = document.createElement("li");
    serviceItem.className =
      "list-group-item d-flex justify-content-between align-items-center";
    serviceItem.innerHTML = `
            ${service}
            <span>
                <button class="btn btn-sm btn-warning edit-service" data-index="${index}">Tahrirlash</button>
                <button class="btn btn-sm btn-danger delete-service" data-index="${index}">O'chirish</button>
            </span>
        `;
    serviceList.appendChild(serviceItem);
  });
}

// Handle service edit and delete
document.getElementById("service-list").addEventListener("click", function (e) {
  if (e.target.classList.contains("edit-service")) {
    const index = e.target.getAttribute("data-index");
    const newServiceName = prompt("Xizmat nomini tahrirlang:", services[index]);
    if (newServiceName) {
      services[index] = newServiceName;
      updateServiceList();
    }
  } else if (e.target.classList.contains("delete-service")) {
    const index = e.target.getAttribute("data-index");
    services.splice(index, 1);
    updateServiceList();
  }
});

// Display operator services and queue info
document
  .getElementById("operator-dashboard")
  .addEventListener("load", function () {
    const operatorServicesList = document.getElementById(
      "operator-services-list"
    );
    services.forEach((service) => {
      const serviceItem = document.createElement("li");
      serviceItem.className = "list-group-item";
      serviceItem.textContent = service;
      operatorServicesList.appendChild(serviceItem);
    });
  });
