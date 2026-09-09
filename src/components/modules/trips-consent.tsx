"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/stores/app-store";

const TRIPS = [
  {
    title: "Chiang Mai service week",
    when: "21–25 Oct",
    seats: "32/40",
    consent: "28 returned",
    status: "Open",
  },
  {
    title: "Year 9 science museum",
    when: "18 Sep · Day",
    seats: "56/60",
    consent: "51 returned",
    status: "Closing soon",
  },
  {
    title: "Model UN Bangkok",
    when: "2–4 Nov",
    seats: "12/12",
    consent: "12 returned",
    status: "Full",
  },
];

export function TripsConsent() {
  const role = useAppStore((s) => s.role);
  const pushNotification = useAppStore((s) => s.pushNotification);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Trips & consent</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Educational visits, digital consent, and medical packs — iSAMS / SOCS trips.
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {TRIPS.map((t) => (
          <Card key={t.title}>
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-[15px] leading-snug">{t.title}</CardTitle>
                <Badge className="bg-muted text-muted-foreground">{t.status}</Badge>
              </div>
              <CardDescription>{t.when}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                Seats {t.seats} · Consents {t.consent}
              </p>
              <Button
                size="sm"
                className="rounded-full"
                onClick={() =>
                  pushNotification({
                    title: role === "parent" ? "Consent submitted" : "Consent reminder sent",
                    body:
                      role === "parent"
                        ? `${t.title} permission recorded.`
                        : `Families reminded for ${t.title}.`,
                    kind: "success",
                  })
                }
              >
                {role === "parent" ? "Give consent" : "Remind families"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
