"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { api } from "../../../../convex/_generated/api";
import { 
  PlusCircle, 
  Users, 
  TrendingUp, 
  TrendingDown, 
  Wallet,
  ArrowRight
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { ExpenseSummary } from "./_components/expense-summary";
import { BalanceSummary } from "../dashboard/_components/balance-summary";
import { GroupList } from "./_components/group-list";

const DashboardPage = () => {
  const { data: balances, isLoading: balanceLoading } = useConvexQuery(api.dashboard.getUserBalances);
  const { data: groups, isLoading: groupsLoading } = useConvexQuery(api.dashboard.getUserGroups);
  const { data: totalSpent, isLoading: totalSpentLoading } = useConvexQuery(api.dashboard.getTotalSpent);
  const { data: monthlySpending, isLoading: monthlySpendingLoading } = useConvexQuery(api.dashboard.getMonthlySpending);

  // 1. State for the "mild launch effect"
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const isLoading = balanceLoading || groupsLoading || totalSpentLoading || monthlySpendingLoading;

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  const formatMoney = (amount) => {
    return Math.abs(amount || 0).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  };

  // Helper class for the transition base
  const transitionBase = "transition-all duration-1000 ease-out";
  const hiddenState = "opacity-0 translate-y-8";
  const visibleState = "opacity-100 translate-y-0";

  return (
    <div className="h-full bg-[#f5f5f5] ">
      <div className="container max-w-7xl mx-auto py-8 px-4 sm:px-6 space-y-10">
        
        {/* ================= HEADER SECTION ================= */}
        <div 
          className={`
            flex flex-col sm:flex-row sm:items-center justify-between gap-6
            ${transitionBase}
            ${isLoaded ? visibleState : hiddenState}
          `}
        >
          <div className="space-y-1">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-800">
              Dashboard
            </h1>
            <p className="text-gray-500 text-lg font-light">
              Your financial overview at a glance.
            </p>
          </div>
          
          <Link href="/expenses/new">
            <Button 
              size="lg" 
              className="rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-[#1cc29f] hover:bg-[#15a386] text-white px-8 hover:-translate-y-1"
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              Add Expense
            </Button>
          </Link>
        </div>

        {/* ================= BALANCE CARDS ================= */}
        <div 
          className={`
            grid grid-cols-1 md:grid-cols-3 gap-6
            ${transitionBase} delay-200
            ${isLoaded ? visibleState : hiddenState}
          `}
        >
          {/* Total Balance */}
          <Card className="border-none shadow-md bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group">
            <div className="absolute -top-4 -right-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <Wallet className="w-32 h-32 text-[#1cc29f]" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-gray-500 flex items-center gap-2 uppercase tracking-wider">
                <div className="p-2 bg-[#1cc29f]/10 rounded-lg">
                  <Wallet className="h-4 w-4 text-[#1cc29f]" />
                </div>
                Total Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tight">
                {balances?.totalBalance > 0 ? (
                  <span className="text-[#1cc29f] flex items-center">
                    +{formatMoney(balances?.totalBalance)}
                  </span>
                ) : balances?.totalBalance < 0 ? (
                  <span className="text-rose-500 flex items-center">
                    -{formatMoney(balances?.totalBalance)}
                  </span>
                ) : (
                  <span className="text-gray-400">$0.00</span>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-2 font-medium">
                {balances?.totalBalance > 0
                  ? "Overall, you are owed money."
                  : balances?.totalBalance < 0
                    ? "Overall, you owe money."
                    : "All debts are settled."}
              </p>
            </CardContent>
          </Card>

          {/* You Are Owed */}
          <Card className="border-none shadow-sm bg-white hover:bg-gray-50/50 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-gray-500 flex items-center gap-2 uppercase tracking-wider">
                <div className="p-2 bg-[#1cc29f]/10 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-[#1cc29f]" />
                </div>
                You are owed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#1cc29f] tracking-tight">
                {formatMoney(balances?.youAreOwed)}
              </div>
              <div className="flex items-center text-sm text-gray-400 mt-2">
                <Users className="mr-1.5 h-3.5 w-3.5" />
                <span>from {balances?.oweDetails?.youAreOwedBy?.length || 0} people</span>
              </div>
            </CardContent>
          </Card>

          {/* You Owe */}
          <Card className="border-none shadow-sm bg-white hover:bg-gray-50/50 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-gray-500 flex items-center gap-2 uppercase tracking-wider">
                <div className="p-2 bg-rose-100 rounded-lg">
                  <TrendingDown className="h-4 w-4 text-rose-500" />
                </div>
                You owe
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-rose-500 tracking-tight">
                {formatMoney(balances?.youOwe)}
              </div>
              <div className="flex items-center text-sm text-gray-400 mt-2">
                <Users className="mr-1.5 h-3.5 w-3.5" />
                <span>to {balances?.oweDetails?.youOwe?.length || 0} people</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ================= MAIN CONTENT GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column (Spending) */}
          <div 
            className={`
              lg:col-span-2 flex flex-col gap-6
              ${transitionBase} delay-300
              ${isLoaded ? visibleState : hiddenState}
            `}
          >
            <Card className="border-none shadow-sm bg-white h-full">
               <CardHeader>
                 <CardTitle className="text-gray-800">Spending Analysis</CardTitle>
               </CardHeader>
               <CardContent>
                 <ExpenseSummary
                    monthlySpending={monthlySpending}
                    totalSpent={totalSpent}
                 />
               </CardContent>
            </Card>
          </div>

          {/* Right Column (Details) */}
          <div 
            className={`
              space-y-8
              ${transitionBase} delay-500
              ${isLoaded ? visibleState : hiddenState}
            `}
          >
            
            {/* Balance Details */}
            <Card className="border-none shadow-sm bg-white">
              <CardHeader className="pb-4 flex flex-row items-center justify-between border-b border-gray-100">
                <CardTitle className="text-base font-semibold text-gray-800">Detailed Balances</CardTitle>
                <Link href="/contacts" className="text-sm text-gray-500 hover:text-[#1cc29f] flex items-center transition-colors">
                  View all <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardHeader>
              <CardContent className="pt-4">
                <BalanceSummary balances={balances} />
              </CardContent>
            </Card>

            {/* Groups List */}
            <Card className="border-none shadow-sm bg-white">
              <CardHeader className="pb-4 flex flex-row items-center justify-between border-b border-gray-100">
                <CardTitle className="text-base font-semibold text-gray-800">Your Groups</CardTitle>
                <Link href="/group" className="text-sm text-gray-500 hover:text-[#1cc29f] flex items-center transition-colors">
                  View all <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardHeader>
              <CardContent className="pt-4">
                <GroupList groups={groups} />
              </CardContent>
              <CardFooter className="pt-2">
                <Link href="/contacts?createGroup=true" className="w-full">
                  <Button variant="ghost" className="w-full text-gray-500 hover:text-[#1cc29f] hover:bg-[#1cc29f]/5 border border-dashed border-gray-200">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Group
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="container max-w-7xl mx-auto py-10 px-4 sm:px-6 space-y-10">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <Skeleton className="h-10 w-48 bg-gray-200" />
            <Skeleton className="h-4 w-64 bg-gray-200" />
          </div>
          <Skeleton className="h-12 w-40 rounded-xl bg-gray-200" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-40 rounded-xl bg-gray-200" />
          <Skeleton className="h-40 rounded-xl bg-gray-200" />
          <Skeleton className="h-40 rounded-xl bg-gray-200" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Skeleton className="h-125 rounded-xl bg-gray-200" />
          </div>
          <div className="space-y-8">
            <Skeleton className="h-62.5 rounded-xl bg-gray-200" />
            <Skeleton className="h-62.5 rounded-xl bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;