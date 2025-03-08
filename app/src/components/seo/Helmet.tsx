'use client';
import { useEffect } from "react";
export default function Helmet({ children }: { children?: React.ReactNode }) {
    useEffect(() => {
      if (children) {
        const head = document.head;
        const html = Array.isArray(children)
          ? children.map(child => child?.toString() || '').join('')
          : children.toString();
        head.innerHTML += html.replace(/<head>|<\/head>/g, '').replace(/React\.createElement/g, '');
      }
    }, [children]);
    return null;
  }
