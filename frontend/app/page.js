    
"use client"
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Search } from "lucide-react"
import { Send } from "lucide-react"
import { loading } from "lucide-react"
import { Ai } from "lucide-react"
// import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
export default function Home() {
  const [data, setData] = useState(null);
  const { setTheme } = useTheme()
  const [text, setText] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //     fetch('http://localhost:5000/api/recommend')
  //         .then(response => response.json())
  //         .then(data => setData(data))
  //         .catch(error => console.error('Error fetching data:', error));
  // }, []);

  const descriptions = data?.Description || []
  const images = data?.Image || []
  const links = data?.Link || []
  const maps = data?.Map || []
  const names = data?.Name || []

  const send = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort() , 10000);
    
    try {
      const res = await fetch('https://visitethiopia-recommender-5.onrender.com/api/recommend', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({text}),
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!res.ok) throw new Error("Server error")
      
      const data = await res.json();
      setResponse(data.message);
      setData(data)

    }catch (err) {
      if (err.name === 'AbortError') {
        setError("err")
      }
      setError(err.message || "Something went wrong");

    }finally {setLoading( false)}
  }
  return (
      <main>
        <div className="div">
          <Image
          src="/Group.png"
          width={25}
          height={25}
          alt="img"
          className="mt-6 m-4 h-7"
          />
          <p
          className="mt-6 text">AI trip</p>
        <Input className="search" placeholder="Write your interest" onChange={(e) => setText(e.target.value)}/>
        <Button className="sea_bt" onClick={send}>
          <Send />
          {loading? "Loading": "Recommend"}
          
          </Button>
        <DropdownMenu>
      <DropdownMenuTrigger asChild  className="moon">
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
        </div>
          {/* Recommendation Place */}
        <div className="post">
          {names.map((name, index) => (
            <div key={index} className='w-9 border-input flex-col h-auto w-auto min-w-0 rounded-md bg-transparent px-3 py-1 text-base  transition-[color,box-shadow] outline-none file:inline-flex disabled:opacity-50 md:text-sm hover:bg-'>
            {images [index] && (
              <Image
              className='rounded-sm mb-1'
              width={300}
              height={250}
              alt='img'
              src={images[index]}/>
            )}
            
            <p className="text-lg">{name}</p>
            {links[index] && (
              <Link href="" className="mt-1 mb-1 flex text-" >Location : Addis Abeba</Link>
            )}
            {maps[index] && (
              <Link href="" className="text- mt-1 mb-1 flex">7000KM long </Link>
            )}
            <div className="here w-full flex">
              <p className="bg-chart-1 p-1 rounded-sm m-1">trip</p>
            </div>
            <Button className="rounded-lg w-27 flex m-1" size="sm">Visit</Button>
            </div>
            ))}
          </div>
          <footer></footer>
      </main>
  );
}