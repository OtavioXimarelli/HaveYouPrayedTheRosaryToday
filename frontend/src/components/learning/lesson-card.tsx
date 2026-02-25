"use client";

import { Check, Clock, Lock, ArrowRight } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";

interface LessonCardProps {
  title: string;
  description: string;
  duration: string;
  path: string;
  isCompleted?: boolean;
  isLocked?: boolean;
  lessonNumber?: number;
  icon?: string;
}

export function LessonCard({
  title,
  description,
  duration,
  path,
  isCompleted = false,
  isLocked = false,
  lessonNumber,
  icon = "📖"
}: LessonCardProps) {
  const router = useRouter();
  const t = useTranslations("Lesson");

  const handleClick = () => {
    if (!isLocked) {
      router.push(path);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`group p-5 sm:p-6 rounded-2xl transition-all duration-300 ${
        isLocked
          ? "glass opacity-60 cursor-not-allowed"
          : isCompleted
          ? "bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 cursor-pointer hover:-translate-y-1 hover:shadow-lg"
          : "glass sacred-border cursor-pointer hover:-translate-y-1 hover:shadow-gold-glow"
      }`}
      data-testid={`lesson-card-${path.replace(/\//g, "-")}`}
    >
      <div className="flex items-start gap-4">
        {/* Icon/Number */}
        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${
          isLocked
            ? "bg-muted"
            : isCompleted
            ? "bg-gradient-to-br from-emerald-500 to-emerald-600"
            : "bg-gradient-to-br from-gold-500 to-gold-600"
        }`}>
          {isLocked ? (
            <Lock className="w-5 h-5 text-muted-foreground" />
          ) : isCompleted ? (
            <Check className="w-6 h-6 text-white" strokeWidth={3} />
          ) : lessonNumber ? (
            <span className="text-white font-cinzel font-bold text-lg">{lessonNumber}</span>
          ) : (
            <span className="text-xl">{icon}</span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {isCompleted && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-semibold">
                {t("completed")}
              </span>
            )}
            {isLocked && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-semibold">
                {t("locked")}
              </span>
            )}
          </div>
          
          <h3 className={`font-cinzel font-bold text-lg mb-1 ${
            isLocked ? "text-muted-foreground" : "text-foreground group-hover:text-gold-600 dark:group-hover:text-gold-400"
          } transition-colors`}>
            {title}
          </h3>
          
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="text-xs">{duration}</span>
            </div>
            
            {!isLocked && (
              <ArrowRight className={`w-4 h-4 ${
                isCompleted ? "text-emerald-500" : "text-gold-500"
              } group-hover:translate-x-1 transition-transform`} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
