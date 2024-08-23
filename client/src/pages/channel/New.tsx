import { Link, useNavigate } from "react-router-dom";
import FullScreenCard from "../../components/FullScreenCard";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FormEvent, useRef } from "react";
import Select, { SelectInstance } from "react-select";
import { useLoggedInAuth } from "../../context/AuthContext";

const New = () => {
  const { streamChat, user } = useLoggedInAuth();
  const navigate = useNavigate();
  const createChannel = useMutation({
    mutationFn: ({
      name,
      memberIds,
      imageUrl,
    }: {
      name: string;
      memberIds: string[];
      imageUrl?: string;
    }) => {
      if (streamChat == null) throw Error("Not Connected");
      return streamChat
        .channel("messaging", crypto.randomUUID(), {
          name,
          image: imageUrl,
          members: [user.id, ...memberIds],
        })
        .create();
    },
    onSuccess() {
      navigate("/");
    },
  });

  const nameRef = useRef<HTMLInputElement>(null);
  const imageUrlRef = useRef<HTMLInputElement>(null);
  const membersIdsRef =
    useRef<SelectInstance<{ label: string; value: string }>>(null);
  const users = useQuery({
    queryKey: ["stream", "users"],
    queryFn: () =>
      streamChat!.queryUsers(
        { id: { $ne: user.id } },
        {
          name: 1,
        }
      ),
    enabled: streamChat != null,
  });
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    const name = nameRef.current?.value;
    const imageUrl = imageUrlRef.current?.value; // Use 'imageUrl' consistently

    const selectOptions = membersIdsRef.current?.getValue();
    if (
      name == null ||
      name === "" ||
      selectOptions == null ||
      selectOptions.length === 0
    ) {
      return;
    }
    createChannel.mutate({
      name,
      imageUrl, // Now this correctly refers to the image URL input
      memberIds: selectOptions.map((option) => option.value),
    });
  };

  return (
    <FullScreenCard>
      <FullScreenCard.Body>
        <div>
          <h1 className="text-3xl text-bold mb-8 text-center">
            New Conversation
          </h1>
          <form
            onSubmit={submitHandler}
            className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-5 items-center justify-items-end"
          >
            <label htmlFor="name">Name</label>
            <Input id="name" required ref={nameRef} />
            <label htmlFor="imageUrl">Image Url</label>
            <Input id="imageUrl"  ref={imageUrlRef} />
            <label htmlFor="members">Members</label>
            <Select
              ref={membersIdsRef}
              id="members"
              required
              isMulti
              classNames={{ container: () => "w-full" }}
              isLoading={users.isPending}
              options={users.data?.users.map((user) => {
                return { value: user.id, label: user.name || user.id };
              })}
            />
            <Button
              disabled={createChannel.isPending}
              className="col-span-full"
              type="submit"
            >
              {createChannel.isPending ? "Loading" : "Create Channel"}
            </Button>
          </form>
        </div>
      </FullScreenCard.Body>
      <FullScreenCard.BelowCard>
        <Link to={"/"}>Back</Link>
      </FullScreenCard.BelowCard>
    </FullScreenCard>
  );
};

export default New;
