"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useAppStore } from "@/stores/app-store";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

const kindStyles = {
  info: "border-primary/20 bg-primary/5",
  warning: "border-traffic-yellow/40 bg-traffic-yellow/10",
  safeguarding: "border-destructive/30 bg-destructive/10",
  success: "border-traffic-green/40 bg-traffic-green/10",
};

export function MacOsNotificationCenter() {
  const open = useAppStore((s) => s.notificationOpen);
  const setOpen = useAppStore((s) => s.setNotificationOpen);
  const notifications = useAppStore((s) => s.notifications);
  const dismiss = useAppStore((s) => s.dismissNotification);
  const clear = useAppStore((s) => s.clearNotifications);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close notifications"
            className="absolute inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="absolute right-3 top-3 z-50 flex w-[320px] flex-col gap-2"
          >
            <div className="macos-glass flex items-center justify-between rounded-2xl border border-black/5 px-3 py-2 dark:border-white/10">
              <p className="text-[13px] font-semibold">Notification Center</p>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={clear}
                  className="rounded-md px-2 py-1 text-[11px] text-muted-foreground hover:bg-black/5 dark:hover:bg-white/10"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-md p-1 text-muted-foreground hover:bg-black/5 dark:hover:bg-white/10"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {notifications.length === 0 ? (
              <div className="macos-glass rounded-2xl border border-black/5 p-4 text-center text-sm text-muted-foreground dark:border-white/10">
                You&apos;re all caught up.
              </div>
            ) : (
              notifications.map((n) => (
                <motion.div
                  key={n.id}
                  layout
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className={cn(
                    "macos-glass rounded-2xl border p-3 shadow-md",
                    kindStyles[n.kind]
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[13px] font-semibold">{n.title}</p>
                      <p className="mt-0.5 text-[12px] text-muted-foreground">
                        {n.body}
                      </p>
                      <p className="mt-2 text-[10px] text-muted-foreground">
                        {formatDistanceToNow(n.createdAt, { addSuffix: true })}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => dismiss(n.id)}
                      className="rounded-md p-1 text-muted-foreground hover:bg-black/5 dark:hover:bg-white/10"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
