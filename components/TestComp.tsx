"use client";

import { MutableRefObject, RefObject, useEffect, useRef, useState } from "react";

export const TestComp = () => {
  const [list, setList] = useState<string[]>(["old", "mid", "new"]);
  const [back, setBack] = useState(["oldBack", "midback", "newback"])
  const [inp, setInp] = useState("");
  const [inp2, setInp2] = useState("");
  const [loading, setLoading] = useState(true)

  const divRef = useRef<HTMLDivElement>(null)

  useEffect(()=>{
    setLoading(false)
  }, [])
  
  useEffect(()=>{
    const listCont = divRef.current;
    if(listCont){
      listCont.scrollTop = listCont.scrollHeight
    }
  }, [list])
  if(loading) return <div>DAWDWDAWd</div>

  return (
    <div>
      <div ref={divRef} className="flex flex-col border border-red-500 max-h-[250px] overflow-y-scroll">
        {back.map((item, i)=>(
          <div key={i}>
            {item}
          </div>
        ))}
        {list.map((item, i)=>(
          <div key={i}>
            {item}
          </div>
        ))}
      </div>
      <input
        type="text"
        onChange={(e) => {
          setInp(e.target.value);
        }}
        value={inp}
      />
      <button
        onClick={() => {
          setList([...list, inp]);
        }}
      >
        Add front
      </button>
      <input
        type="text"
        onChange={(e) => {
          setInp2(e.target.value);
        }}
        value={inp2}
      />
      <button
        onClick={() => {
          setBack([inp2, ...back]);
        }}
      >
        Add back
      </button>
    </div>
  );
};
