import {useEffect, useState} from "react";

export default function  useHover(ref) {

  const [hover, setHover] = useState(false);

  const on = () => setHover(true);
  const off = () => setHover(false);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const node = ref.current;

    node.addEventListener('mouseenter', on);
    node.addEventListener('mouseleave', off);

    return function () {
      node.removeEventListener('mouseenter', on);
      node.removeEventListener('mouseleave', off);
    }

  }, []);

  return hover;

}
