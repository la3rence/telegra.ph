"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import GithubSlugger from "github-slugger";
const slugger = new GithubSlugger();

export interface Article {
  id?: string;
  slug?: string;
  title: string;
  author: string;
  content: string;
  published_at?: string;
  created_at?: string;
}

export async function saveArticle(article: Article) {
  if (!article.slug) {
    article.slug = encodeURIComponent(slugger.slug(article.title));
  }
  const { data, error } = await supabase
    .from("articles")
    .insert([article])
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new Error(
        "This title is already taken. Please choose a different one."
      );
    }
    throw new Error(`Error saving article: ${error.message}`);
  }

  revalidatePath(`/${article.slug}`);
  revalidatePath(`/articles`);
  return article.slug;
}

export async function getArticle(slug: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    throw new Error(`Error fetching article: ${error.message}`);
  }

  return data;
}

export async function getAllArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("published_at", { ascending: false });

  if (error) {
    throw new Error(`Error fetching articles: ${error.message}`);
  }

  return data || [];
}

export async function checkSlugAvailability(slug: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("articles")
    .select("slug")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw new Error(`Error checking slug availability: ${error.message}`);
  }

  return data === null;
}
