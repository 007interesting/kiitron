import React from "react"

import { CheckIcon, MessageCircleIcon, PaperclipIcon, SettingsIcon, ThumbsUpIcon } from "lucide-react"

import { PersonIcon } from "@radix-ui/react-icons"

import { Button, Card, CardHeader, ScrollArea } from "../../ui"

const Feature1 = () => {
  return (
    <Card className="mx-auto w-full max-w-4xl">
      <CardHeader className="flex items-center justify-between border-b p-2">
        <div className="flex items-center gap-4">
          <span className="text-primary">Project Collaboration</span>
          <div>
            <h3 className="text-lg font-medium">Project Collaboration</h3>
            <p className="text-muted-foreground text-sm">Discuss and track progress on project tasks</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
          >
            <PaperclipIcon className="h-5 w-5" />
            <span className="sr-only">Attach file</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
          >
            <CheckIcon className="h-5 w-5" />
            <span className="sr-only">View tasks</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
          >
            <SettingsIcon className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
        </div>
      </CardHeader>
      <ScrollArea className="h-[500px] border-b">
        <div className="space-y-4 p-6">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 border">
              <PersonIcon className="h-10 w-10" />
            </div>
            <div className="grid gap-1 text-sm">
              <div className="flex items-center gap-2">
                <div className="font-medium">Olivia Davis</div>
                <div className="text-muted-foreground">2:39pm</div>
              </div>
              <div>
                <p>
                  Hey everyone, just wanted to give an update on the project timeline. We're on track to deliver the MVP
                  by the end of the month.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                >
                  <ThumbsUpIcon className="h-4 w-4" />
                  <span className="sr-only">Like</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                >
                  <MessageCircleIcon className="h-4 w-4" />
                  <span className="sr-only">Comment</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                >
                  <PaperclipIcon className="h-4 w-4" />
                  <span className="sr-only">Attach file</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 border">
              <PersonIcon className="h-10 w-10" />
            </div>
            <div className="grid gap-1 text-sm">
              <div className="flex items-center gap-2">
                <div className="font-medium">Alex Nguyen</div>
                <div className="text-muted-foreground">2:41pm</div>
              </div>
              <div>
                <p>Sounds good, looking forward to the update!</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                >
                  <ThumbsUpIcon className="h-4 w-4" />
                  <span className="sr-only">Like</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                >
                  <MessageCircleIcon className="h-4 w-4" />
                  <span className="sr-only">Comment</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 border">
              <PersonIcon className="h-10 w-10" />
            </div>
            <div className="grid gap-1 text-sm">
              <div className="flex items-center gap-2">
                <div className="font-medium">Sarah Lee</div>
                <div className="text-muted-foreground">2:43pm</div>
              </div>
              <div>
                <p>Great work team, keep it up!</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                >
                  <ThumbsUpIcon className="h-4 w-4" />
                  <span className="sr-only">Like</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </Card>
  )
}

export default Feature1
