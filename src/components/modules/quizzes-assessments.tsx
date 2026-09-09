"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/stores/app-store";

const QUIZZES = [
  { title: "Cells quiz", subject: "Sciences", due: "Thu", submissions: "22/28" },
  { title: "Algebra exit ticket", subject: "Math", due: "Today", submissions: "18/28" },
  { title: "Source analysis warm-up", subject: "I&S", due: "Fri", submissions: "10/28" },
];

const QUESTIONS = [
  { q: "Which organelle produces ATP?", options: ["Nucleus", "Mitochondria", "Ribosome"], answer: 1 },
  { q: "Photosynthesis occurs mainly in the…", options: ["Root", "Stem", "Leaf"], answer: 2 },
];

export function QuizzesAssessments() {
  const [taking, setTaking] = useState(false);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const pushNotification = useAppStore((s) => s.pushNotification);

  function answer(i: number) {
    const correct = QUESTIONS[step]!.answer === i;
    if (correct) setScore((s) => s + 1);
    if (step + 1 >= QUESTIONS.length) {
      setTaking(false);
      setStep(0);
      pushNotification({
        title: "Quiz submitted",
        body: `Score ${score + (correct ? 1 : 0)}/${QUESTIONS.length} · synced to gradebook.`,
        kind: "success",
      });
      setScore(0);
      return;
    }
    setStep((s) => s + 1);
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Quizzes & checks</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Formative quizzes with auto-sync into the gradebook.
        </p>
      </div>

      {taking ? (
        <Card>
          <CardHeader>
            <CardTitle>
              Question {step + 1} of {QUESTIONS.length}
            </CardTitle>
            <CardDescription>{QUESTIONS[step]!.q}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {QUESTIONS[step]!.options.map((opt, i) => (
              <Button
                key={opt}
                variant="outline"
                className="w-full justify-start rounded-xl"
                onClick={() => answer(i)}
              >
                {opt}
              </Button>
            ))}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Assigned</CardTitle>
            <CardDescription>Live checks for this week</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {QUIZZES.map((q) => (
              <div
                key={q.title}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-black/5 bg-muted/30 px-3 py-3 text-sm dark:border-white/10"
              >
                <div>
                  <p className="font-medium">{q.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {q.subject} · Due {q.due} · {q.submissions}
                  </p>
                </div>
                <Button size="sm" className="rounded-full" onClick={() => setTaking(true)}>
                  Start
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
