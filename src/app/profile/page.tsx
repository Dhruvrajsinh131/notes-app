"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../components";
import AddForm from "../components/AddForm";
import List from "../components/List";
import Loader from "../components/Loader";

const Profile = () => {
  const [data, setData] = useState(null);
  const [showCreateComponent, setShowCreateComponent] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const resp = await fetch("http://localhost:9090/api/notes", {
        credentials: "include",
      });

      const respJson = await resp.json();
      console.log("respJson", respJson);

      if (respJson.success === false) {
        router.push("/login");
      } else {
        setData(respJson.data);
      }
    };

    fetchProfile();
  }, []);

  const logout = async () => {
    const resp = await fetch("http://localhost:9090/api/logout", {
      method: "POST",
      credentials: "include",
    });

    const respJson = await resp.json();

    if (respJson.success === false) {
      setData(respJson.message);
    } else {
      router.push("/login");
    }
  };

  if (!data) return <Loader />;

  return (
    <div className="relaive">
      {!showCreateComponent && (
        <button
          onClick={() => {
            setShowCreateComponent(true);
          }}
          title="Add Note"
          className="bg-blue-700 hover:bg-blue-500 text-white  h-12 w-12 font-bold self-center text-center  text-2xl  rounded-full fixed right-[2%] top-[87%] cursor-pointer"
        >
          +
        </button>
      )}
      <nav className="flex justify-between items-center px-10 py-5 bg-slate-100 shadow-xl">
        <div>
          <h1 className="text-3xl font-bold ">INotes</h1>
        </div>
        <Button onClick={logout}>Log Out</Button>
      </nav>

      <section className=" p-10 h-full">
        <div className="bg-slate-100 p-5 rounded-xl font-bold">
          Welcome User !!!
        </div>
        {showCreateComponent ? (
          <div className="relative mt-5 bg-slate-100 p-5 rounded-xl">
            <button
              className="font-extrabold absolute right-[0.7%] top-[1%] cursor-pointer"
              onClick={() => {
                setShowCreateComponent(false);
              }}
            >
              X
            </button>
            <AddForm
              data={data}
              setData={setData}
              setShowCreateComponent={setShowCreateComponent}
            />
          </div>
        ) : (
          <div className="flex flex-wrap justify-around gap-15   mt-5 bg-slate-100 p-5 rounded-xl">
            <List data={data} />
          </div>
        )}
      </section>
    </div>
  );
};

export default Profile;
