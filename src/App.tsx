import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import { NextUIProvider } from "@nextui-org/react";
import './App.css';

const CARD_WIDTH = 160;

const list = [
  {
    title: 'Orange',
    img: 'https://nextui.org/images/fruit-1.jpeg',
    price: '$5.50',
  },
  {
    title: 'Tangerine',
    img: 'https://nextui.org/images/fruit-2.jpeg',
    price: '$3.00',
  },
  {
    title: 'Raspberry',
    img: 'https://nextui.org/images/fruit-3.jpeg',
    price: '$10.00',
  },
  {
    title: 'Lemon',
    img: 'https://nextui.org/images/fruit-4.jpeg',
    price: '$5.30',
  },
  {
    title: 'Avocado',
    img: 'https://nextui.org/images/fruit-5.jpeg',
    price: '$15.70',
  },
  {
    title: 'Lemon 2',
    img: 'https://nextui.org/images/fruit-6.jpeg',
    price: '$8.00',
  },
  {
    title: 'Banana',
    img: 'https://nextui.org/images/fruit-7.jpeg',
    price: '$7.50',
  },
  {
    title: 'Watermelon',
    img: 'https://nextui.org/images/fruit-8.jpeg',
    price: '$12.20',
  },
];

function App() {
  const wrapper = useRef<HTMLDivElement>(null)
  const container = useRef<HTMLDivElement>(null)


  async function scrollRight() {
    const scrollLeft = container.current?.scrollLeft;
    const clientWidth = container.current?.clientWidth;
    const scrollWidth = container.current?.scrollWidth;
    if (scrollLeft !== undefined && clientWidth !== undefined && scrollWidth !== undefined) {
      if (scrollLeft < scrollWidth - clientWidth) {
        container.current?.scrollBy({
          left: CARD_WIDTH + 32,
          behavior: 'smooth'
        })
        // if (scrollWidth - clientWidth - scrollLeft <= CARD_WIDTH + 32) {
        //   container.current?.scrollTo({
        //     left: 2 * (CARD_WIDTH + 32),
        //     behavior: 'auto'
        //   })
        // }
      }
      else {
        container.current?.scrollTo({
          left: 2 * (CARD_WIDTH + 32),
          behavior: 'auto'
        })
      }
      await new Promise(r => setTimeout(r, 1000));
    }
  }

  useEffect(() => {
    // const interval = setInterval(() => {
    //   scrollRight()
    // }, 1000);

    // return () => clearInterval(interval);

    scrollRight()
  }, [])


  return (
    <NextUIProvider>
      <div ref={wrapper}>
        <div ref={container} className="flex gap-8 p-8 overflow-auto">
          {list.concat(list).map((item, index) => (
            <Card shadow="sm" key={index} isPressable className={`w-[160px] min-w-[160px]`} onPress={() => scrollRight()}>
              <CardBody className="overflow-visible p-0">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={item.title}
                  className="w-full object-cover h-[140px]"
                  src={item.img}
                />
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b>{item.title}</b>
                <p className="text-default-500">{item.price}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </NextUIProvider>
  );
}

export default App;
