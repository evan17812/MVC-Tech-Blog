const commentFormHandler = async (event) => {
    event.preventDefault();

    const comment = document.querySelector("#comment").value.trim();
    const blogpostId = document.querySelector("#blogpost_id").value;

    if (comment) {
      const response = await fetch("/api/comment", {
        method: "POST",
        body: JSON.stringify({ comment, blogpostId }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replace(`/blogpost/${blogpostId}`);
      } else {
        alert("Failed to sign up.");
      }
    }
  };

  document
    .querySelector(".comment-form")
    .addEventListener("submit", commentFormHandler);