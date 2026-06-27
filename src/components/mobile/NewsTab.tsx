import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  MessageSquare,
  Share2,
  Send,
  PlusCircle,
  X,
  CheckCircle,
  Smile,
  ShieldCheck,
  Award
} from 'lucide-react';
import { FeedPost, Comment } from '../../types';
import { FOUNDER_IMAGE, LOGO_IMAGE } from '../../data';

interface NewsProps {
  posts: FeedPost[];
  onAddPost: (post: FeedPost) => void;
  onUpdatePosts: (updatedPosts: FeedPost[]) => void;
  userProfile: any;
}

export default function NewsTab({ posts, onAddPost, onUpdatePosts, userProfile }: NewsProps) {
  const [activeCommentsPostId, setActiveCommentsPostId] = useState<string | null>(null);
  const [newCommentText, setNewCommentText] = useState('');
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Toggle Likes
  const handleLike = (postId: string) => {
    const updated = posts.map((post) => {
      if (post.id === postId) {
        const likedByMe = !post.likedByMe;
        return {
          ...post,
          likedByMe,
          likes: likedByMe ? post.likes + 1 : post.likes - 1
        };
      }
      return post;
    });
    onUpdatePosts(updated);
  };

  // Add Comment
  const handleAddComment = (e: React.FormEvent, postId: string) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: Comment = {
      id: `c-${Date.now()}`,
      author: userProfile.fullName,
      avatar: userProfile.profilePhoto,
      content: newCommentText,
      date: 'Just now'
    };

    const updated = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    });

    onUpdatePosts(updated);
    setNewCommentText('');
  };

  // Submit New Post
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newPost: FeedPost = {
      id: `post-${Date.now()}`,
      author: userProfile.fullName,
      authorRole: userProfile.volunteerStatus === 'Active' ? 'Active Volunteer' : 'Community Member',
      authorAvatar: userProfile.profilePhoto,
      content: newPostContent,
      image: newPostImage || undefined,
      date: 'Just now',
      likes: 0,
      comments: [],
      likedByMe: false
    };

    onAddPost(newPost);
    setIsCreatingPost(false);
    setNewPostContent('');
    setNewPostImage('');
  };

  // Trigger Share Toast
  const handleShare = (postTitle: string) => {
    navigator.clipboard.writeText(`https://communityconnect.app/post/${encodeURIComponent(postTitle)}`);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 1500);
  };

  return (
    <div className="w-full h-full overflow-y-auto px-4 pb-20 bg-[#FAF9F6] flex flex-col gap-4 relative">
      {/* Header & Add Post */}
      <div className="pt-4 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-black text-[#0F5D46] tracking-tight">Activity Feed</h2>
          <p className="text-[10px] text-neutral-500 font-medium">
            Daily logs, leader reports, and volunteer welfare activity stories
          </p>
        </div>
        <button
          onClick={() => setIsCreatingPost(true)}
          className="flex items-center gap-1 px-2.5 py-1.5 bg-[#0F5D46] text-white rounded-lg text-[10px] font-bold hover:bg-[#0c4e3b]"
        >
          <PlusCircle className="w-4 h-4 text-[#C8A23A]" />
          Create Post
        </button>
      </div>

      {/* Share Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-neutral-900 text-white px-4 py-2 rounded-full text-[10px] font-bold shadow-lg flex items-center gap-1.5 border border-[#C8A23A]/30"
          >
            <CheckCircle className="w-3.5 h-3.5 text-green-400" />
            Copied share link to clipboard!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feed Posts list */}
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-4 flex flex-col gap-3">
            {/* Post Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full border border-neutral-100 overflow-hidden shadow-sm">
                  <img
                    src={post.authorAvatar}
                    alt={post.author}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="text-xs font-extrabold text-neutral-800">{post.author}</h4>
                    {post.authorRole.includes("Leader") && (
                      <ShieldCheck className="w-3.5 h-3.5 text-[#C8A23A]" />
                    )}
                  </div>
                  <p className="text-[9px] text-[#0F5D46] font-bold">{post.authorRole} • {post.date}</p>
                </div>
              </div>
            </div>

            {/* Post Content */}
            <p className="text-xs text-neutral-700 leading-relaxed font-medium">
              {post.content}
            </p>

            {/* Post Image attachment */}
            {post.image && (
              <div className="h-44 w-full rounded-xl overflow-hidden border border-neutral-100 shadow-sm">
                <img
                  src={post.image}
                  alt="Post Attachment"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Action Bar */}
            <div className="flex justify-between items-center pt-2.5 border-t border-neutral-50 text-[10px] font-black text-neutral-500">
              <button
                onClick={() => handleLike(post.id)}
                className={`flex items-center gap-1 hover:text-red-500 transition-colors ${post.likedByMe ? 'text-red-500' : ''}`}
              >
                <Heart className={`w-4 h-4 ${post.likedByMe ? 'fill-current text-red-500' : ''}`} />
                {post.likes} Likes
              </button>

              <button
                onClick={() => setActiveCommentsPostId(activeCommentsPostId === post.id ? null : post.id)}
                className={`flex items-center gap-1 hover:text-[#0F5D46] transition-colors ${activeCommentsPostId === post.id ? 'text-[#0F5D46]' : ''}`}
              >
                <MessageSquare className="w-4 h-4" />
                {post.comments.length} Comments
              </button>

              <button
                onClick={() => handleShare(post.content)}
                className="flex items-center gap-1 hover:text-[#C8A23A] transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>

            {/* Comments Expanded Section */}
            <AnimatePresence>
              {activeCommentsPostId === post.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden border-t border-neutral-50 pt-2 flex flex-col gap-2.5"
                >
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="p-2 rounded-xl bg-[#FAF9F6] border border-neutral-100/50 flex gap-2">
                      <div className="w-6 h-6 rounded-full overflow-hidden border border-neutral-200 shrink-0">
                        <img
                          src={comment.avatar}
                          alt={comment.author}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] font-black text-neutral-700">{comment.author}</span>
                          <span className="text-[8px] text-neutral-400 font-semibold">{comment.date}</span>
                        </div>
                        <p className="text-[10px] text-neutral-600 font-medium leading-normal mt-0.5">{comment.content}</p>
                      </div>
                    </div>
                  ))}

                  {post.comments.length === 0 && (
                    <p className="text-[9px] text-neutral-400 font-bold text-center py-2">No comments yet. Write the first one!</p>
                  )}

                  {/* Add Comment Input */}
                  <form onSubmit={(e) => handleAddComment(e, post.id)} className="flex gap-2 items-center mt-1">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      className="flex-1 px-3 py-1.5 bg-[#FAF9F6] border border-neutral-200 rounded-lg text-[10px] font-medium text-neutral-800 outline-none focus:ring-1 focus:ring-[#0F5D46]"
                    />
                    <button
                      type="submit"
                      className="w-8 h-8 rounded-lg bg-[#0F5D46]/10 text-[#0F5D46] hover:bg-[#0F5D46] hover:text-white flex items-center justify-center transition-all"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Floating Create Post Dialog */}
      <AnimatePresence>
        {isCreatingPost && (
          <div className="absolute inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full bg-white rounded-2xl p-4 shadow-xl flex flex-col gap-3"
            >
              <div className="flex justify-between items-center border-b border-neutral-100 pb-2">
                <h3 className="text-xs font-black text-[#0F5D46] uppercase">Create Community Post</h3>
                <button
                  onClick={() => setIsCreatingPost(false)}
                  className="w-6 h-6 bg-neutral-100 rounded-full flex items-center justify-center"
                >
                  <X className="w-3.5 h-3.5 text-neutral-500" />
                </button>
              </div>

              <form onSubmit={handleCreatePost} className="flex flex-col gap-3">
                <textarea
                  required
                  rows={4}
                  placeholder="What is happening in the community today? (activities, blood updates, volunteer requests)"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="w-full p-2.5 bg-[#FAF9F6] border border-neutral-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#0F5D46] resize-none text-neutral-800"
                />

                <input
                  type="url"
                  placeholder="Add an image URL (optional)"
                  value={newPostImage}
                  onChange={(e) => setNewPostImage(e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#FAF9F6] border border-neutral-200 rounded-lg text-[10px] outline-none text-neutral-800"
                />

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full py-2 bg-[#0F5D46] text-white text-xs font-black rounded-lg shadow-sm border border-[#C8A23A]/20"
                >
                  Share Update
                </motion.button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
