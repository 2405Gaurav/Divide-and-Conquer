"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { api } from "../../../../convex/_generated/api";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { motion } from "framer-motion"; // 1. Import Framer Motion
import { Plus, Users, User, ArrowRight, UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { CreateGroupModal } from "./_components/create-group-modal";
import { cn } from "@/lib/utils";

export default function ContactsPage() {
//   const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
const createGroupParam = searchParams.get("createGroup");
const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(
  createGroupParam === "true"
);

  const router = useRouter();
  const searchParams = useSearchParams();

  const { data, isLoading } = useConvexQuery(api.contacts.getAllContacts);

  useEffect(() => {
    const createGroupParam = searchParams.get("createGroup");
    if (createGroupParam === "true") {
      setIsCreateGroupModalOpen(true);
      const url = new URL(window.location.href);
      url.searchParams.delete("createGroup");
      router.replace(url.pathname + url.search);
    }
  }, [searchParams, router]);

  // 2. Define Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  if (isLoading) {
    return <ContactsSkeleton />;
  }

  const { users, groups } = data || { users: [], groups: [] };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="container max-w-5xl mx-auto py-10 px-4 md:px-6 space-y-12"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">Contacts</h1>
            <p className="text-muted-foreground mt-2 text-lg font-light">
              Manage your shared expenses and groups.
            </p>
          </div>
          <Button 
            onClick={() => setIsCreateGroupModalOpen(true)} 
            size="lg"
            className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Group
          </Button>
        </motion.div>

        {/* Groups Section */}
        <motion.section variants={itemVariants}>
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-primary/10 rounded-full">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold tracking-tight">Your Groups</h2>
            <span className="text-xs font-medium bg-muted px-2.5 py-0.5 rounded-full text-muted-foreground border">
              {groups.length}
            </span>
          </div>

          {groups.length === 0 ? (
            <EmptyState 
              icon={Users} 
              text="No groups yet. Create one to start tracking." 
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groups.map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          )}
        </motion.section>

        {/* People Section */}
        <motion.section variants={itemVariants}>
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-orange-100 rounded-full">
              <User className="h-5 w-5 text-orange-600" />
            </div>
            <h2 className="text-xl font-semibold tracking-tight">Friends</h2>
            <span className="text-xs font-medium bg-muted px-2.5 py-0.5 rounded-full text-muted-foreground border">
              {users.length}
            </span>
          </div>

          {users.length === 0 ? (
            <EmptyState 
              icon={UserPlus} 
              text="No contacts yet. Add an expense to see them here." 
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {users.map((user) => (
                <ContactCard key={user.id} user={user} />
              ))}
            </div>
          )}
        </motion.section>
      </motion.div>

      <CreateGroupModal
        isOpen={isCreateGroupModalOpen}
        onClose={() => setIsCreateGroupModalOpen(false)}
        onSuccess={(groupId) => router.push(`/groups/${groupId}`)}
      />
    </div>
  );
}

// --- Sub-components ---

function GroupCard({ group }) {
  return (
    <Link href={`/groups/${group.id}`} className="block h-full">
      <Card className="h-full p-5 flex flex-col justify-between hover:-translate-y-1 hover:shadow-md transition-all duration-300 border-none shadow-sm ring-1 ring-black/5 bg-white">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border bg-primary/5">
              <AvatarFallback className="bg-transparent text-primary font-bold">
                {group.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-foreground leading-none mb-1">
                {group.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {group.memberCount} {group.memberCount === 1 ? 'member' : 'members'}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-end">
          <div className="text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors flex items-center">
            View <ArrowRight className="ml-1 h-3 w-3" />
          </div>
        </div>
      </Card>
    </Link>
  );
}

function ContactCard({ user }) {
  return (
    <Link href={`/person/${user.id}`} className="block h-full">
      <Card className="h-full p-4 flex items-center gap-4 hover:bg-gray-50/80 transition-all duration-200 border-none shadow-sm ring-1 ring-black/5">
        <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
          <AvatarImage src={user.imageUrl} />
          <AvatarFallback className="bg-orange-100 text-orange-700 font-semibold">
            {user.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="overflow-hidden">
          <h3 className="font-medium text-foreground truncate">{user.name}</h3>
          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
        </div>
      </Card>
    </Link>
  );
}

function EmptyState({ icon: Icon, text }) {
  return (
    <div className="border border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-white/50">
      <div className="p-3 bg-gray-50 rounded-full mb-3">
        <Icon className="h-6 w-6 text-muted-foreground/50" />
      </div>
      <p className="text-sm text-muted-foreground font-medium">{text}</p>
    </div>
  );
}

// Minimal Skeleton Loader
function ContactsSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container max-w-5xl mx-auto py-10 px-4 md:px-6 space-y-12">
        <div className="flex justify-between items-end border-b pb-6">
          <div className="space-y-2">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-5 w-64" />
          </div>
          <Skeleton className="h-10 w-32 rounded-full" />
        </div>

        <div className="space-y-4">
          <Skeleton className="h-6 w-32" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-32 rounded-xl" />
            <Skeleton className="h-32 rounded-xl" />
            <Skeleton className="h-32 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}