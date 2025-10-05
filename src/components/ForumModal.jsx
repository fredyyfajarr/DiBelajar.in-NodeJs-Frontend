/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import Modal from './Modal';
import { useForumPosts, useCreateForumPost } from '/src/hooks/useAdmin.js';
import useAuthStore from '/src/store/authStore.js';

// Komponen terpisah untuk satu postingan (recursively renders replies)
const Post = ({ post, onReplyClick, isReplyingToThis }) => {
  const { user } = useAuthStore();
  const isOwnPost = post.userId?._id === user._id;
  // console.log('Rendering Post:', post._id, 'isOwnPost:', isOwnPost);

  // Class untuk menyorot post yang sedang dibalas
  const highlightClass = isReplyingToThis
    ? 'ring-2 ring-primary ring-offset-2'
    : '';

  return (
    <div className="flex flex-col">
      <div className={`flex gap-3 ${isOwnPost ? 'self-end' : 'self-start'}`}>
        <div
          className={`p-3 rounded-xl max-w-md transition-all ${
            isOwnPost ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'
          } ${highlightClass}`}
        >
          <p className="font-bold text-sm">{post.userId?.name || 'User'}</p>
          <p className="whitespace-pre-wrap break-words mt-1">{post.text}</p>
          <p className="text-xs opacity-70 mt-1.5 text-right">
            {new Date(post.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
      </div>
      <div
        className={`text-xs mt-1 ${
          isOwnPost ? 'text-right mr-2' : 'text-left ml-2'
        }`}
      >
        <button
          onClick={() => onReplyClick(post)}
          className="font-semibold text-gray-500 hover:underline"
        >
          Balas
        </button>
      </div>
      {post.replies && post.replies.length > 0 && (
        <div className="pl-6 mt-2 border-l-2 border-gray-200 space-y-3">
          {post.replies.map((reply) => (
            <Post
              key={reply._id}
              post={reply}
              onReplyClick={onReplyClick}
              isReplyingToThis={isReplyingToThis} // ini seharusnya id reply, tapi untuk simple highlight tidak apa-apa
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Komponen Modal Utama
const ForumModal = ({ isOpen, onClose, courseId, material, courseSlug }) => {
  const { data: response, isLoading } = useForumPosts(courseId, material?._id);
  const posts = response?.data?.data || [];

  const { mutate: createPost, isPending } = useCreateForumPost();
  const { register, handleSubmit, reset, setFocus } = useForm();

  const [replyingTo, setReplyingTo] = useState(null);
  const [parentPost, setParentPost] = useState(null);

  const handleReplyClick = (postToReply) => {
    setReplyingTo(postToReply._id);
    setParentPost(postToReply);
    setFocus('text');
  };

  const cancelReply = () => {
    setReplyingTo(null);
    setParentPost(null);
  };

  const onSubmit = (data) => {
    if (!data.text.trim()) return;
    createPost(
      {
        courseId,
        materialId: material._id,
        postData: { text: data.text, parentPostId: replyingTo },
        courseSlug, // Kirim courseSlug agar query di LearningPage bisa di-invalidate
      },
      {
        onSuccess: () => {
          reset();
          cancelReply();
        },
      }
    );
  };

  const messagesEndRef = useRef(null);
  useEffect(() => {
    // Scroll ke bawah setiap kali ada post baru (kecuali saat sedang me-reply)
    if (!replyingTo) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [posts, replyingTo]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 w-full max-w-4xl flex flex-col h-[80vh]">
        <h2 className="text-2xl font-bold mb-4 flex-shrink-0">
          Diskusi: {material?.title}
        </h2>

        <div className="flex-grow overflow-y-auto pr-2 space-y-4 mb-4">
          {isLoading && (
            <p className="text-center text-gray-500">Memuat diskusi...</p>
          )}
          {!isLoading && posts.length === 0 && (
            <p className="text-center text-text-muted">
              Jadilah yang pertama memulai diskusi!
            </p>
          )}
          {posts.map((post) => (
            <Post
              key={post._id}
              post={post}
              onReplyClick={handleReplyClick}
              isReplyingToThis={post._id === replyingTo}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-shrink-0 mt-auto border-t pt-4"
        >
          {replyingTo && parentPost && (
            <div className="text-sm bg-gray-100 p-2 rounded-t-lg mb-[-1px] border border-b-0">
              <div className="flex justify-between items-center">
                <span>
                  Membalas kepada <strong>{parentPost.userId?.name}</strong>
                </span>
                <button
                  type="button"
                  onClick={cancelReply}
                  className="font-bold text-lg leading-none text-gray-500 hover:text-gray-800"
                >
                  &times;
                </button>
              </div>
              <div className="text-xs text-text-muted mt-1 p-2 bg-gray-200 rounded truncate">
                "{parentPost.text}"
              </div>
            </div>
          )}
          <div className="flex gap-2">
            <textarea
              {...register('text', { required: true })}
              placeholder="Ketik pesan Anda..."
              className="flex-grow border rounded-md p-2 focus:ring-2 focus:ring-primary focus:outline-none transition"
              rows="2"
            ></textarea>
            <button
              type="submit"
              disabled={isPending}
              className="bg-primary text-white font-semibold px-6 rounded-md disabled:opacity-50 hover:bg-opacity-90 transition"
            >
              {isPending ? '...' : replyingTo ? 'Balas' : 'Kirim'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ForumModal;
