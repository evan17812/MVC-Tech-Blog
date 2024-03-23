const blogpostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector("#title").value.trim();
    const content = document.querySelector("#blogpost").value.trim();

    if (content && title) {

      const response = await fetch("/api/blogpost", {
        method: "POST",
        body: JSON.stringify({ content, title }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        console.log(response);
        alert("Failed to log in.");
      }
    }
  };

  const updateFormHandler = async (event) => {
    event.preventDefault();

    const id = document.querySelector("#blogpost_id").value;
    const title = document.querySelector("#title").value.trim();
    const content = document.querySelector("#blogpost").value.trim();

    if (id) {

      const response = await fetch(`/api/blogpost/${id}`, {
        method: "PUT",
        body: JSON.stringify({ content, title }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replace(`/blogpost/${id}`);
      } else {
        console.log(response);
        alert("Failed to log in.");
      }
    }
  };

  const deleteFormHandler = async (event) => {
    event.preventDefault();

    const id = document.querySelector("#blogpost_id").value;

    if (id) {
      const response = await fetch(`/api/blogpost/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        console.log(response);
        alert("Failed to log in.");
      }
    }
  };

  const updateBtn = document.querySelector("#update-btn");
  const submitBtn = document.querySelector("#submit-btn");
  const deleteBtn = document.querySelector(".delete-btn");
  if (submitBtn) {
    submitBtn.addEventListener("click", blogpostFormHandler);
  }
  if (updateBtn) {
    updateBtn.addEventListener("click", updateFormHandler);
  }
  if (deleteBtn) {
    deleteBtn.addEventListener("click", deleteFormHandler);
  }