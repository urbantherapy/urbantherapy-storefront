"use client"

import { useEffect, useState } from "react"
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react"
import clsx from "clsx"

import { Container } from "./Container"
import { BackgroundImage } from "./BackgroundImage"

interface Day {
  date: React.ReactNode
  dateTime: string
  summary: string
  timeSlots: Array<{
    name: string
    description: string | null
    start: string
    end: string
  }>
}

const schedule: Array<Day> = [
  {
    date: "August 14",
    dateTime: "2024-08-14",
    summary:
      "Kick off your journey with a day dedicated to sustainable craftsmanship and creative collaboration.",
    timeSlots: [
      {
        name: "Emily Thatcher",
        description: "Sustainable Crafting Techniques",
        start: "9:00AM",
        end: "10:30AM",
      },
      {
        name: "Omar Sadiq",
        description: "Collaborative Design Thinking",
        start: "11:00AM",
        end: "12:30PM",
      },
      {
        name: "Elena Martinez",
        description: "Eco-Friendly Materials: A Deep Dive",
        start: "1:30PM",
        end: "3:00PM",
      },
    ],
  },
  {
    date: "August 15",
    dateTime: "2024-08-15",
    summary:
      "A day focused on branding, marketing, and the business side of making.",
    timeSlots: [
      {
        name: "Michael Anders",
        description: "Building Your Brand as a Maker",
        start: "9:00AM",
        end: "10:30AM",
      },
      {
        name: "Samantha Li",
        description: "Social Media Strategies for Makers",
        start: "11:00AM",
        end: "12:30PM",
      },
      {
        name: "David Greenfield",
        description: "Pricing and Selling Your Handcrafted Goods",
        start: "1:30PM",
        end: "3:00PM",
      },
    ],
  },
  {
    date: "August 16",
    dateTime: "2024-08-16",
    summary:
      "Closing the event with hands-on workshops and networking opportunities.",
    timeSlots: [
      {
        name: "Linda Powell",
        description: "Hands-On Workshop: Upcycling Techniques",
        start: "9:00AM",
        end: "11:00AM",
      },
      {
        name: "Networking Session",
        description: "Connect with Fellow Makers",
        start: "11:30AM",
        end: "12:30PM",
      },
      {
        name: "Panel Discussion",
        description: "The Future of Sustainable Making",
        start: "1:00PM",
        end: "2:30PM",
      },
    ],
  },
]

function ScheduleTabbed() {
  let [tabOrientation, setTabOrientation] = useState("horizontal")

  useEffect(() => {
    let smMediaQuery = window.matchMedia("(min-width: 640px)")

    function onMediaQueryChange({ matches }: { matches: boolean }) {
      setTabOrientation(matches ? "vertical" : "horizontal")
    }

    onMediaQueryChange(smMediaQuery)
    smMediaQuery.addEventListener("change", onMediaQueryChange)

    return () => {
      smMediaQuery.removeEventListener("change", onMediaQueryChange)
    }
  }, [])

  return (
    <TabGroup
      className="mx-auto grid max-w-2xl grid-cols-1 gap-y-6 sm:grid-cols-2 lg:hidden"
      vertical={tabOrientation === "vertical"}
    >
      <TabList className="-mx-4 flex gap-x-4 gap-y-10 overflow-x-auto pb-4 pl-4 sm:mx-0 sm:flex-col sm:pb-0 sm:pl-0 sm:pr-8">
        {({ selectedIndex }) => (
          <>
            {schedule.map((day, dayIndex) => (
              <div
                key={day.dateTime}
                className={clsx(
                  "relative w-3/4 flex-none pr-4 sm:w-auto sm:pr-0",
                  dayIndex !== selectedIndex && "opacity-70"
                )}
              >
                <DaySummary
                  day={{
                    ...day,
                    date: (
                      <Tab className="focus:outline-none focus:ring-0 focus:border-teal">
                        <span className="absolute inset-0" />
                        {day.date}
                      </Tab>
                    ),
                  }}
                />
              </div>
            ))}
          </>
        )}
      </TabList>
      <TabPanels>
        {schedule.map((day) => (
          <TabPanel
            key={day.dateTime}
            className="ui-not-focus-visible:outline-none"
          >
            <TimeSlots day={day} />
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  )
}

function DaySummary({ day }: { day: Day }) {
  return (
    <>
      <h3 className="text-2xl font-normal tracking-tight text-sage-8">
        <time dateTime={day.dateTime}>{day.date}</time>
      </h3>
      <p className="mt-1.5 text-base tracking-tight text-sage-6">
        {day.summary}
      </p>
    </>
  )
}

function TimeSlots({ day, className }: { day: Day; className?: string }) {
  return (
    <ol
      role="list"
      className={clsx(
        className,
        "space-y-8 bg-sage-1/50 hover:bg-sage-1 px-10 py-14 text-center shadow-md rounded-lg shadow-sage-3 backdrop-blur"
      )}
    >
      {day.timeSlots.map((timeSlot, timeSlotIndex) => (
        <li
          key={timeSlot.start}
          aria-label={`${timeSlot.name} talking about ${timeSlot.description} at ${timeSlot.start} - ${timeSlot.end} PST`}
        >
          {timeSlotIndex > 0 && (
            <div className="mx-auto mb-8 h-px w-48 bg-sage-1" />
          )}
          <h4 className="text-lg font-normal tracking-tight text-sage-10">
            {timeSlot.name}
          </h4>
          {timeSlot.description && (
            <p className="mt-1 tracking-tight text-sage-8">
              {timeSlot.description}
            </p>
          )}
          <p className="mt-1 font-mono text-sm text-sage-6">
            <time dateTime={`${day.dateTime}T${timeSlot.start}-08:00`}>
              {timeSlot.start}
            </time>{" "}
            -{" "}
            <time dateTime={`${day.dateTime}T${timeSlot.end}-08:00`}>
              {timeSlot.end}
            </time>{" "}
            PST
          </p>
        </li>
      ))}
    </ol>
  )
}

function ScheduleStatic() {
  return (
    <div className="hidden lg:grid lg:grid-cols-3 lg:gap-x-8">
      {schedule.map((day) => (
        <section key={day.dateTime}>
          <DaySummary day={day} />
          <TimeSlots day={day} className="mt-10" />
        </section>
      ))}
    </div>
  )
}

export function Schedule() {
  return (
    <section
      id="schedule"
      aria-label="Schedule"
      className="py-20 sm:py-32 bg-sage-2"
    >
      <Container className="relative z-10">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-4xl lg:pr-24">
          <h2 className="mt-4 text-4xl md:text-5xl font-thin tracking-tight text-sage-8">
            Upcoming Events & Workshops
          </h2>
          <p className="mt-8 text-base md:text-lg leading-6 text-sage-6">
            {`Join us at our upcoming events and workshops designed to inspire, educate, and connect makers. Whether you're a seasoned artisan or just starting your journey, our community events offer something for everyone.`}
          </p>
        </div>
      </Container>
      <div className="relative mt-14 sm:mt-24">
        {/* <BackgroundImage position="right" className="-bottom-32 -top-40" /> */}
        <Container className="relative">
          <ScheduleTabbed />
          <ScheduleStatic />
        </Container>
      </div>
    </section>
  )
}
