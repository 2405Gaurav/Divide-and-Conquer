"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { api } from "../../../../convex/_generated/api";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { BarLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Users, User, ArrowRight } from "lucide-react";
import { CreateGroupModal } from "./_components/create-group-modal";
import { cn } from "@/lib/utils";

export default function ContactsPage() {
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
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

  if (isLoading) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <BarLoader width={200} color="#36d7b7" />
      </div>
    );
  }

  const { users, groups } = data || { users: [], groups: [] };

  return (
    <div className="container max-w-5xl mx-auto py-10 px-4 md:px-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 border-b pb-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Contacts</h1>
          <p className="text-muted-foreground mt-2 text-lg font-light">
            Manage your shared expenses and groups.
          </p>
        </div>
        <Button 
          onClick={() => setIsCreateGroupModalOpen(true)} 
          size="lg"
          className="shadow-sm hover:shadow-md transition-all"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Group
        </Button>
      </div>

      <div className="space-y-12">
        {/* Groups Section */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold tracking-tight">Your Groups</h2>
            <span className="text-xs font-medium bg-muted px-2 py-1 rounded-full text-muted-foreground">
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
        </section>

        {/* People Section */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-secondary rounded-lg">
              <User className="h-5 w-5 text-secondary-foreground" />
            </div>
            <h2 className="text-xl font-semibold tracking-tight">Friends</h2>
            <span className="text-xs font-medium bg-muted px-2 py-1 rounded-full text-muted-foreground">
              {users.length}
            </span>
          </div>

          {users.length === 0 ? (
            <EmptyState 
              icon={User} 
              text="No contacts yet. Add an expense to see them here." 
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {users.map((user) => (
                <ContactCard key={user.id} user={user} />
              ))}
            </div>
          )}
        </section>
      </div>

      <CreateGroupModal
        isOpen={isCreateGroupModalOpen}
        onClose={() => setIsCreateGroupModalOpen(false)}
        onSuccess={(groupId) => router.push(`/groups/${groupId}`)}
      />
    </div>
  );
}

// --- Sub-components for cleaner minimal layout ---

function GroupCard({ group }) {
  return (
    <Link href={`/groups/${group.id}`} className="group block h-full">
      <Card className="h-full p-5 flex flex-col justify-between hover:border-primary/50 hover:shadow-sm transition-all duration-200 border-border/60">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border bg-primary/5">
              <AvatarFallback className="bg-transparent text-primary font-medium">
                {group.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-foreground leading-none mb-1 group-hover:text-primary transition-colors">
                {group.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {group.memberCount} {group.memberCount === 1 ? 'member' : 'members'}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center text-xs font-medium text-muted-foreground group-hover:text-primary/80 transition-colors">
          View Group <ArrowRight className="ml-1 h-3 w-3" />
        </div>
      </Card>
    </Link>
  );
}

function ContactCard({ user }) {
  return (
    <Link href={`/person/${user.id}`} className="block h-full">
      <Card className="h-full p-4 flex items-center gap-4 hover:bg-muted/40 hover:border-primary/30 transition-all duration-200 border-border/60">
        <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
          <AvatarImage src={user.imageUrl} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
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
    <div className="border border-dashed border-border/80 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-muted/5">
      <Icon className="h-8 w-8 text-muted-foreground/50 mb-3" />
      <p className="text-sm text-muted-foreground font-medium">{text}</p>
    </div>
  );
}