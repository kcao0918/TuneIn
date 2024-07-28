"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Carousel, Card } from "../components/ui/apple-cards-carousel";
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input";
import { data } from "@/lib/constants";
import { collection, onSnapshot } from "firebase/firestore";
import { db, storage } from "@/lib/firebase/clientApp";
import { Content } from "next/font/google";
import { getDownloadURL, ref } from "firebase/storage";

export default function Dashboard() {
  const [query, setQuery] = useState<string>("");
  const [postList, setPostList] = useState<any[]>([]);
  const placeholders = ["Search for a gig/opportunity..."];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setQuery(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
    // Action here
  };

  useEffect(() => {
    const postRef = collection(db, "posts");
    const unsubscribe = onSnapshot(postRef, (snapshot) => {
      let temp: any[] = [];
      if (!snapshot.empty) {
        snapshot.forEach(async (doc) => {
          const images = ref(storage, `images/${doc.data().files[0]}`);
          const url = await getDownloadURL(images);
          let postData = {
            src: url,
            title: doc.data().title,
            category: "apples",
            description: doc.data().desc,
            content: "apples",
          };
          temp.push({ postData });
        });
        setPostList([...temp]);
      }
      console.log(temp);
    });
    return () => unsubscribe();
  }, []);

  const cards = postList.map((card, index) => (
    <Card key={index} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full bg-customone">
      <div className="backdrop-blur-lg">
        <h2 className="pt-20 max-w-7xl mx-auto text-3xl md:text-5xl font-bold text-customfive font-sans text-center">
          Featured Gigs/Opportunities
        </h2>
        <div className="pb-12 pt-12">
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
          />
        </div>
      </div>
      {/* <Carousel items={cards} /> */}
      {postList.map((key, index) => (
        <div key={key}>{key}</div>
      ))}
    </div>
  );
}
