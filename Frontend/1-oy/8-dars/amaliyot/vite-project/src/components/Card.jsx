import { Card } from "flowbite-react";
import React from 'react'

export default function Cardd() {
  const userList = [
    {id: 1,
    title: "Test 1",
    description: "description"
    },
    {id: 2,
    title: "Test 2",
    description: "description"
    },
    {id: 3,
    title: "Test 3",
    description: "description"
    },
    {id: 4,
    title: "Test 4",
    description: "description"
    },
    {id: 5,
    title: "Test 5",
    description: "description"
    },
    {id: 6,
    title: "Test 6",
    description: "description"
    },
    {id: 7,
    title: "Test 7",
    description: "description"
    },
    {id: 8,
    title: "Test 8",
    description: "description"
    },
    {id: 9,
    title: "Test 9",
    description: "description"
    },
    {id: 10,
    title: "Test 10",
    description: "description"
    },
  ]
  return (
    <div className="grid grid-cols-3 gap-5">
      {userList.map(({id, title, description}) => {
        return (
          <div className="container mx-auto">
      <Card href="#" className="">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {description}
      </p>
    </Card>
    </div>
        )
      })}
    </div>
  )
}

