import { FormEvent, useRef } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const { signup } = useAuth();
  console.log(signup);
  const usernameRef = useRef<HTMLInputElement>(null);

  const nameRef = useRef<HTMLInputElement>(null);

  const imageUrlRef = useRef<HTMLInputElement>(null);
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (signup.isPending) return;
    const username = usernameRef.current?.value;

    const name = nameRef.current?.value;

    const imageUrl = imageUrlRef.current?.value;
    if (username == null || username === "" || name == null || name === "") {
      return;
    }
    signup.mutate({ id: username, name, image: imageUrl });
  };
  return (
    <div>
      <h1 className="text-3xl text-bold mb-8 text-center">Signup</h1>
      <form
        onSubmit={submitHandler}
        className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-5 items-center justify-items-end"
      >
        <label htmlFor="userName">Username</label>
        <Input
          id="userName"
          pattern="^\S+$"
          required
          ref={usernameRef}
        />
        <label htmlFor="name">Name</label>
        <Input id="name" pattern="[a-zA-Z\s]+" required ref={nameRef} />
        <label htmlFor="imageUrl">Image Url</label>
        <Input id="imageUrl" pattern="/S*" type="url" ref={imageUrlRef} />
        <Button
          disabled={signup.isPending}
          className="col-span-full"
          type="submit"
        >
          {signup.isPending ? "Loading" : "Sign Up"}
        </Button>
      </form>
    </div>
  );
};

export default Signup;
