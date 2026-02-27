"use client";

import { useState } from "react";
import { Heart, MessageCircle, Send, Loader2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useFeed, useAddAmen, useAddComment } from "@/hooks/use-rosary";
import { CheckIn, getMysteryInfo, INTENTION_TAGS } from "@/types";
import { formatRelativeTime, getInitials, cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export function CommunityFeed() {
  const t = useTranslations("CommunityFeed");
  const { data, isLoading, error } = useFeed();

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-gray-50 dark:bg-navy-darker">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-navy dark:text-white mb-8 text-center">
            {t("title")}
          </h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 dark:bg-navy rounded-full" />
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-gray-200 dark:bg-navy rounded" />
                    <div className="h-3 w-16 bg-gray-200 dark:bg-navy rounded" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-16 bg-gray-200 dark:bg-navy rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4 bg-gray-50 dark:bg-navy-darker">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-red-500">{t("error")}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-navy-darker min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-navy dark:text-white mb-3">
            {t("title")}
          </h2>
          <p className="text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        <div className="space-y-6">
          {data?.checkIns.map((checkIn) => (
            <FeedCard key={checkIn.id} checkIn={checkIn} />
          ))}
        </div>

        {data?.checkIns.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🙏</div>
            <p className="text-muted-foreground">
              {t("empty")}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function FeedCard({ checkIn }: { checkIn: CheckIn }) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const t = useTranslations("CommunityFeed");
  
  const amenMutation = useAddAmen();
  const commentMutation = useAddComment();

  const mysteryInfo = getMysteryInfo(checkIn.mystery);
  const intentionLabels = checkIn.intentions.map(
    (tag) => INTENTION_TAGS.find((t) => t.value === tag)
  );

  const handleAmen = () => {
    amenMutation.mutate({ checkInId: checkIn.id });
  };

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    
    commentMutation.mutate(
      { checkInId: checkIn.id, content: newComment.trim() },
      { onSuccess: () => setNewComment("") }
    );
  };

  return (
    <Card variant="elevated" className="overflow-hidden">
      <CardHeader className="flex flex-row items-start gap-4 pb-3">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-navy to-navy-light flex items-center justify-center flex-shrink-0">
          {checkIn.user.avatarUrl ? (
            <img
              src={checkIn.user.avatarUrl}
              alt={checkIn.user.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-white font-semibold">
              {getInitials(checkIn.user.name)}
            </span>
          )}
        </div>

        {/* User info & mystery */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold text-navy dark:text-white truncate">
              {checkIn.user.name}
            </h3>
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              {formatRelativeTime(checkIn.createdAt)}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            {t("prayedThe")}{" "}
            <span className="text-gold font-medium">{mysteryInfo.name}</span>
          </p>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        {/* Reflection */}
        {checkIn.reflection && (
          <p className="text-navy dark:text-white/90 mb-4 leading-relaxed">
            "{checkIn.reflection}"
          </p>
        )}

        {/* Intention tags */}
        {intentionLabels.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {intentionLabels.map(
              (tag) =>
                tag && (
                  <span
                    key={tag.value}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-gold/10 text-gold-dark text-xs rounded-full"
                  >
                    <span>{tag.emoji}</span>
                    <span>{tag.label}</span>
                  </span>
                )
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex-col items-stretch pt-3 border-t">
        {/* Action buttons */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleAmen}
              disabled={amenMutation.isPending}
              className={cn(
                "gap-2 transition-colors",
                checkIn.hasUserAmened && "text-red-500"
              )}
            >
              <Heart
                className={cn("w-5 h-5", checkIn.hasUserAmened && "fill-current")}
              />
              <span>{checkIn.amens}</span>
              <span className="text-muted-foreground">{t("amen")}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowComments(!showComments)}
              className="gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{checkIn.comments.length}</span>
            </Button>
          </div>
        </div>

        {/* Comments section */}
        {showComments && (
          <div className="space-y-3 pt-3 border-t">
            {/* Existing comments */}
            {checkIn.comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-navy flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-gray-500 dark:text-white/50" />
                </div>
                <div className="flex-1 bg-gray-100 dark:bg-navy/50 rounded-lg px-3 py-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-navy dark:text-white">
                      {comment.user.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatRelativeTime(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-navy/80 dark:text-white/80">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))}

            {/* New comment input */}
            <div className="flex gap-2">
              <Input
                placeholder={t("commentPlaceholder")}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmitComment()}
                className="flex-1"
              />
              <Button
                size="icon"
                variant="navy"
                onClick={handleSubmitComment}
                disabled={!newComment.trim() || commentMutation.isPending}
              >
                {commentMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
