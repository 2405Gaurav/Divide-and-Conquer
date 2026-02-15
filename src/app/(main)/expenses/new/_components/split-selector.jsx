"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

export function SplitSelector({
  type,
  amount,
  participants,
  paidByUserId,
  onSplitsChange,
}) {
  const { user } = useUser();
  const [splits, setSplits] = useState([]);
  const [totalPercentage, setTotalPercentage] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  // Initialize and Reset Splits when Type/Amount/Participants change
  useEffect(() => {
    if (!amount || amount <= 0 || participants.length === 0) {
      setSplits([]);
      return;
    }

    let newSplits = [];

    if (type === "equal") {
      // Logic to handle cents (e.g., 100 / 3 = 33.33, 33.33, 33.34)
      const rawShare = Math.floor((amount / participants.length) * 100) / 100;
      const remainder = Number((amount - rawShare * participants.length).toFixed(2));

      newSplits = participants.map((participant, index) => {
        // Give the remainder cents to the first person
        const finalAmount = index === 0 ? rawShare + remainder : rawShare;
        return {
          userId: participant.id,
          name: participant.name,
          email: participant.email,
          imageUrl: participant.imageUrl,
          amount: Number(finalAmount.toFixed(2)),
          percentage: (finalAmount / amount) * 100,
          paid: participant.id === paidByUserId,
        };
      });
    } else if (type === "percentage") {
      // Initialize percentage splits evenly (amount is calculated based on %)
      const evenPercentage = 100 / participants.length;
      newSplits = participants.map((participant) => ({
        userId: participant.id,
        name: participant.name,
        email: participant.email,
        imageUrl: participant.imageUrl,
        amount: (amount * evenPercentage) / 100,
        percentage: evenPercentage,
        paid: participant.id === paidByUserId,
      }));
    } else if (type === "exact") {
      // Initialize exact splits evenly (percentage is calculated based on amount)
      const evenAmount = amount / participants.length;
      newSplits = participants.map((participant) => ({
        userId: participant.id,
        name: participant.name,
        email: participant.email,
        imageUrl: participant.imageUrl,
        amount: Number(evenAmount.toFixed(2)),
        percentage: (evenAmount / amount) * 100,
        paid: participant.id === paidByUserId,
      }));
    }

    setSplits(newSplits);
    updateTotals(newSplits);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, amount, participants, paidByUserId]); 
  // removed onSplitsChange from deps to prevent infinite loops if parent didn't memoize it

  const updateTotals = (currentSplits) => {
    const tAmount = currentSplits.reduce((sum, s) => sum + s.amount, 0);
    const tPercent = currentSplits.reduce((sum, s) => sum + s.percentage, 0);
    
    setTotalAmount(tAmount);
    setTotalPercentage(tPercent);

    if (onSplitsChange) {
      onSplitsChange(currentSplits);
    }
  };

  const updatePercentageSplit = (userId, newPercentage) => {
    const safePercentage = Math.max(0, Math.min(100, parseFloat(newPercentage) || 0));
    
    const updatedSplits = splits.map((split) => {
      if (split.userId === userId) {
        return {
          ...split,
          percentage: safePercentage,
          amount: (amount * safePercentage) / 100,
        };
      }
      return split;
    });

    setSplits(updatedSplits);
    updateTotals(updatedSplits);
  };

  const updateExactSplit = (userId, newAmount) => {
    // We allow empty string for typing, but logic needs a number
    const parsedAmount = parseFloat(newAmount);
    const validAmount = isNaN(parsedAmount) ? 0 : parsedAmount;

    const updatedSplits = splits.map((split) => {
      if (split.userId === userId) {
        return {
          ...split,
          amount: validAmount,
          percentage: amount > 0 ? (validAmount / amount) * 100 : 0,
        };
      }
      return split;
    });

    setSplits(updatedSplits);
    updateTotals(updatedSplits);
  };

  const isPercentageValid = Math.abs(totalPercentage - 100) < 0.1;
  const isAmountValid = Math.abs(totalAmount - amount) < 0.02; // 0.02 tolerance for rounding

  return (
    <div className="space-y-4 mt-4">
      {splits.map((split) => (
        <div
          key={split.userId}
          className="flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-2 min-w-[120px] w-1/3">
            <Avatar className="h-7 w-7">
              <AvatarImage src={split.imageUrl} />
              <AvatarFallback>{split.name?.charAt(0) || "?"}</AvatarFallback>
            </Avatar>
            <span className="text-sm truncate">
              {split.userId === user?.id ? "You" : split.name}
            </span>
          </div>

          {type === "equal" && (
            <div className="text-right text-sm">
              ${split.amount.toFixed(2)} <span className="text-muted-foreground">({split.percentage.toFixed(1)}%)</span>
            </div>
          )}

          {type === "percentage" && (
            <div className="flex items-center gap-4 flex-1">
              <Slider
                value={[split.percentage]}
                min={0}
                max={100}
                step={1}
                onValueChange={(values) =>
                  updatePercentageSplit(split.userId, values[0])
                }
                className="flex-1"
              />
              <div className="flex gap-1 items-center min-w-[100px]">
                <Input
                  type="number"
                  min="0"
                  max="100"
                  // Do not fix decimals here, it breaks typing
                  value={split.percentage} 
                  onChange={(e) => updatePercentageSplit(split.userId, e.target.value)}
                  className="w-16 h-8 px-2"
                />
                <span className="text-sm text-muted-foreground">%</span>
                <span className="text-xs text-muted-foreground ml-1 tabular-nums">
                  ${split.amount.toFixed(2)}
                </span>
              </div>
            </div>
          )}

          {type === "exact" && (
            <div className="flex items-center gap-2 flex-1 justify-end">
              <div className="flex gap-1 items-center">
                <span className="text-sm text-muted-foreground">$</span>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  // Use raw value to allow typing decimals (e.g. "10.")
                  value={split.amount === 0 ? "" : split.amount} 
                  placeholder="0.00"
                  onChange={(e) => updateExactSplit(split.userId, e.target.value)}
                  className="w-24 h-8 text-right"
                />
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Total row */}
      <div className="flex justify-between border-t pt-3 mt-3">
        <span className="font-medium text-sm">Total</span>
        <div className="text-right flex flex-col items-end">
          <span
            className={`font-medium text-sm ${!isAmountValid ? "text-red-500" : "text-green-600"}`}
          >
            ${totalAmount.toFixed(2)} <span className="text-muted-foreground font-normal">/ ${amount.toFixed(2)}</span>
          </span>
          
          {type === "percentage" && (
            <span
              className={`text-xs ${!isPercentageValid ? "text-red-500" : "text-green-600"}`}
            >
              {totalPercentage.toFixed(1)}%
            </span>
          )}
        </div>
      </div>

      {/* Validation messages */}
      {type === "percentage" && !isPercentageValid && (
        <div className="text-xs text-red-500 mt-1 text-right">
          Total must be 100%
        </div>
      )}

      {type === "exact" && !isAmountValid && (
        <div className="text-xs text-red-500 mt-1 text-right">
          Total must equal ${amount.toFixed(2)} (Diff: ${(amount - totalAmount).toFixed(2)})
        </div>
      )}
    </div>
  );
}