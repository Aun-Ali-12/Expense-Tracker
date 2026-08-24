"use client";

import useForm from "@/hooks/useForm";

export default function AuthForm({ mode }) {
  const { formData, handleChange, handleSubmit, loading, error, succes } =
    useForm(mode);
  return (
    <>
      <div>
        {/* heading  */}
        <h1>{mode === "signup" ? "Signup" : "Login"}</h1>

        {/* form  */}
        <form onSubmit={handleSubmit}>
          {/* name input  */}
          {mode === "login" ? (
            <>
              {/* email input  */}
              <label htmlFor="email">
                enter your email:{" "}
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>
              <br />

              {/* password input  */}
              <label htmlFor="password">
                enter your password:{" "}
                <input
                  type="text"
                  id="password"
                  name="password"
                  minLength={8}
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </label>
              <br />
            </>
          ) : (
            <>
              <label htmlFor="name">
                enter your name:{" "}
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <br />

              {/* email input  */}
              <label htmlFor="email">
                enter your email:{" "}
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>
              <br />

              {/* password input  */}
              <label htmlFor="password">
                enter your password:{" "}
                <input
                  type="text"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </label>
              <br />
            </>
          )}
          <button type="submit">{loading ? "loading" : "submit"}</button>
          {error && <p>{error}</p>}
          {succes && <p>{succes}</p>}
          {/* {successMessage && <p>{successMessage}</p>} */}
        </form>
      </div>
    </>
  );
}
