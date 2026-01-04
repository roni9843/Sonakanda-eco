// src/pages/HomePage.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore.js';
import { useThemeSync } from '../hooks/useThemeSync.js';
import {
  Heart,
  MessageCircle,
  Share2,
  Image as ImageIcon,
  X,
  Camera,
  Loader2,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { API_BASE_URL } from '../utils/apiClient.js';

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-16 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 px-4">
      <div className="bg-black/95 text-white px-5 py-3 rounded-full shadow-2xl backdrop-blur-md border border-yellow-600/30">
        {message}
      </div>
    </div>
  );
};

const MultiImageViewer = ({ images, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleTap = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width / 2) goToPrev();
    else goToNext();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-20 text-white bg-black/60 hover:bg-black/80 rounded-full p-3 transition-colors"
      >
        <X size={28} />
      </button>

      <button
        onClick={goToPrev}
        className="hidden sm:block absolute left-8 top-1/2 -translate-y-1/2 text-white bg-black/60 hover:bg-black/80 rounded-full p-4"
      >
        <ChevronLeft size={36} />
      </button>

      <div className="relative w-full h-full max-w-5xl max-h-[90vh] px-4" onClick={handleTap}>
        <img
          src={`${API_BASE_URL}${images[currentIndex]}`}
          alt={`post image ${currentIndex + 1}`}
          className="w-full h-full object-contain"
        />
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/70 text-white px-5 py-2 rounded-full text-base font-medium">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      <button
        onClick={goToNext}
        className="hidden sm:block absolute right-8 top-1/2 -translate-y-1/2 text-white bg-black/60 hover:bg-black/80 rounded-full p-4"
      >
        <ChevronRight size={36} />
      </button>
    </div>
  );
};

const StoryViewer = ({ stories, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  const currentStory = stories[currentIndex];

  useEffect(() => {
    setProgress(0);

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (currentIndex < stories.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
            return 0;
          } else {
            onClose();
            return 100;
          }
        }
        return prev + 0.6; // ~7 seconds per story
      });
    }, 50);

    return () => clearInterval(intervalRef.current);
  }, [currentIndex, stories.length, onClose]);

  const goToNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onClose();
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleTap = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;

    if (x < rect.width / 2) {
      goToPrev();
    } else {
      goToNext();
    }
  };

  if (!currentStory) return null;

  const formatName = (u) => u?.name_bn || u?.name_en || 'ইউজার';
  const formatTime = (dateStr) => {
    const d = new Date(dateStr);
    const diff = (Date.now() - d) / 1000 / 60;
    if (diff < 1) return 'এইমাত্র';
    if (diff < 60) return `${Math.floor(diff)}মি`;
    if (diff < 1440) return `${Math.floor(diff / 60)}ঘ`;
    return d.toLocaleDateString('bn-BD');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      <div className="absolute top-4 left-0 right-0 flex gap-1 px-4 z-10">
        {stories.map((_, i) => (
          <div key={i} className="h-1 flex-1 bg-gray-700/70 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-100 ease-linear"
              style={{
                width: i === currentIndex ? `${progress}%` : i < currentIndex ? '100%' : '0%',
              }}
            />
          </div>
        ))}
      </div>

      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
      >
        <X size={26} />
      </button>

      <div className="flex-1 relative" onClick={handleTap}>
        <img
          src={`${API_BASE_URL}${currentStory.image}`}
          alt="story"
          className="w-full h-full object-cover"
          draggable={false}
        />

        <div className="absolute bottom-12 left-5 text-white drop-shadow-lg pointer-events-none">
          <p className="font-semibold text-lg">{formatName(currentStory.user)}</p>
          <p className="text-sm opacity-90">{formatTime(currentStory.createdAt)}</p>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); goToPrev(); }}
          className="hidden sm:block absolute left-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-3 text-white"
        >
          <ChevronLeft size={32} />
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); goToNext(); }}
          className="hidden sm:block absolute right-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-3 text-white"
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
};

const HomePage = () => {
  useThemeSync();
  const location = useLocation();
  const { isAuthenticated, user, token } = useUserStore((s) => ({
    isAuthenticated: s.isAuthenticated,
    user: s.user,
    token: s.token,
  }));

  const [posts, setPosts] = useState([]);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState(location.state?.message || '');

  const [newPost, setNewPost] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedPreviews, setSelectedPreviews] = useState([]);
  const [isPosting, setIsPosting] = useState(false);
  const [commentInputs, setCommentInputs] = useState({});
  const [likingPosts, setLikingPosts] = useState({});

  const [isUploadingStory, setIsUploadingStory] = useState(false);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(null);
  const [selectedPostImages, setSelectedPostImages] = useState(null);

  const fileInputRef = useRef(null);
  const storyFileRef = useRef(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [postsRes, storiesRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/posts`),
        fetch(`${API_BASE_URL}/api/posts/stories`),
      ]);

      const postsData = await postsRes.json();
      const storiesData = await storiesRes.json();

      if (postsData.success) setPosts(postsData.data || []);
      if (storiesData.success) setStories(storiesData.data || []);
    } catch (err) {
      setToastMessage('কিছু সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchData();
  }, [isAuthenticated]);

  const openStoryViewer = (index) => setSelectedStoryIndex(index);
  const closeStoryViewer = () => setSelectedStoryIndex(null);

  const openImageViewer = (images) => setSelectedPostImages(images);
  const closeImageViewer = () => setSelectedPostImages(null);

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + selectedFiles.length > 6) {
      setToastMessage('সর্বোচ্চ ৬টা ছবি');
      return;
    }
    setSelectedFiles((prev) => [...prev, ...files]);
    const previews = files.map((file) => URL.createObjectURL(file));
    setSelectedPreviews((prev) => [...prev, ...previews]);
  };

  const removeImage = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setSelectedPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim() && !selectedFiles.length) return;

    setIsPosting(true);
    try {
      const formData = new FormData();
      formData.append('content', newPost.trim());
      selectedFiles.forEach((file) => formData.append('images', file));

      const res = await fetch(`${API_BASE_URL}/api/posts`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setPosts([data.data, ...posts]);
        setNewPost('');
        setSelectedFiles([]);
        setSelectedPreviews([]);
        setToastMessage('পোস্ট হয়েছে ✓');
      }
    } catch {
      setToastMessage('কিছু সমস্যা হয়েছে');
    } finally {
      setIsPosting(false);
    }
  };

  const handleLike = async (postId) => {
    if (likingPosts[postId]) return;
    setLikingPosts((prev) => ({ ...prev, [postId]: true }));

    try {
      const res = await fetch(`${API_BASE_URL}/api/posts/${postId}/like`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setPosts((prev) => prev.map((p) => (p._id === postId ? data.data : p)));
      }
    } finally {
      setLikingPosts((prev) => ({ ...prev, [postId]: false }));
    }
  };

  const handleComment = async (postId) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/posts/${postId}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (data.success) {
        setPosts((prev) => prev.map((p) => (p._id === postId ? data.data : p)));
        setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
      }
    } catch {
      setToastMessage('কমেন্ট করা যায়নি');
    }
  };

  const handleStoryUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingStory(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch(`${API_BASE_URL}/api/posts/stories`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setStories([data.data, ...stories]);
        setToastMessage('স্টোরি যোগ হয়েছে!');
      }
    } catch {
      setToastMessage('সমস্যা হয়েছে');
    } finally {
      setIsUploadingStory(false);
    }
  };

  const formatName = (u) => u?.name_bn || u?.name_en || 'ইউজার';
  const formatTime = (dateStr) => {
    const d = new Date(dateStr);
    const diff = (Date.now() - d) / 1000 / 60;
    if (diff < 1) return 'এইমাত্র';
    if (diff < 60) return `${Math.floor(diff)}মি`;
    if (diff < 1440) return `${Math.floor(diff / 60)}ঘ`;
    return d.toLocaleDateString('bn-BD');
  };

  const isLikedByMe = (post) => post.likes?.some((id) => id.toString() === user?._id);

  if (!isAuthenticated) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        লগইন করে দেখুন
      </div>
    );
  }

  return (
    <>
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage('')} />}

      <div className="min-h-screen bg-gray-50 dark:bg-[#0f0f0f] pb-20 sm:pb-6">
        {/* Stories Section */}
        <div className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-10 py-3 px-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
            {/* Your story */}
            <div className="flex flex-col items-center flex-shrink-0 snap-start">
              <div className="relative">
                <button
                  onClick={() => storyFileRef.current?.click()}
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-[3px]"
                  disabled={isUploadingStory}
                >
                  <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                    {isUploadingStory ? (
                      <Loader2 className="w-6 h-6 text-white animate-spin" />
                    ) : (
                      <Camera className="w-6 h-6 text-white" />
                    )}
                  </div>
                </button>
                <input
                  type="file"
                  ref={storyFileRef}
                  onChange={handleStoryUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              <p className="text-xs mt-1 text-gray-600 dark:text-gray-400">আপনার স্টোরি</p>
            </div>

            {/* Others' stories */}
            {stories.map((story, index) => (
              <div
                key={story._id}
                className="flex flex-col items-center cursor-pointer flex-shrink-0 snap-start"
                onClick={() => openStoryViewer(index)}
              >
                <div className="relative w-16 h-16 rounded-full p-[3px] bg-gradient-to-br from-blue-500 to-purple-600">
                  <img
                    src={`${API_BASE_URL}${story.image}`}
                    alt="story"
                    className="w-full h-full rounded-full object-cover border-2 border-white dark:border-gray-900"
                  />
                </div>
                <p className="text-xs mt-1 text-gray-600 dark:text-gray-400 truncate w-16 text-center">
                  {formatName(story.user)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Create Post */}
        <div className="mx-3 sm:mx-auto max-w-2xl mt-4 bg-white dark:bg-gray-900 rounded-xl shadow">
          <form onSubmit={handlePostSubmit} className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold">
                {formatName(user)[0]}
              </div>
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="আপনি কী ভাবছেন...?"
                className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full px-5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-10"
                rows={1}
              />
            </div>

            {selectedPreviews.length > 0 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                {selectedPreviews.map((preview, i) => (
                  <div key={i} className="relative flex-shrink-0">
                    <img src={preview} alt="preview" className="w-24 h-24 object-cover rounded-lg" />
                    <button
                      onClick={() => removeImage(i)}
                      className="absolute -top-1.5 -right-1.5 bg-black rounded-full p-1"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between mt-3 pt-3 border-t border-gray-200 dark:border-gray-800">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-2 rounded-lg"
              >
                <ImageIcon size={20} />
                <span className="text-sm">ছবি/ভিডিও</span>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />

              <button
                type="submit"
                disabled={isPosting || (!newPost.trim() && !selectedFiles.length)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium flex items-center gap-2 disabled:opacity-50"
              >
                {isPosting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                পোস্ট
              </button>
            </div>
          </form>
        </div>

        {/* Posts Feed */}
        <div className="space-y-4 mt-4 mx-3 sm:mx-auto max-w-2xl">
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
          ) : (
            posts.map((post) => (
              <div key={post._id} className="bg-white dark:bg-gray-900 rounded-xl shadow overflow-hidden">
                {/* Post Header */}
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold">
                      {formatName(post.user)[0]}
                    </div>
                    <div>
                      <p className="font-medium">{formatName(post.user)}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{formatTime(post.createdAt)}</p>
                    </div>
                  </div>
                  <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                    <MoreHorizontal size={20} />
                  </button>
                </div>

                {post.content && (
                  <p className="px-4 pb-3 whitespace-pre-line text-gray-800 dark:text-gray-200">
                    {post.content}
                  </p>
                )}

                {post.images?.length > 0 && (
                  <div className="grid grid-cols-2 gap-1">
                    {post.images.slice(0, 4).map((img, i) => (
                      <div
                        key={i}
                        className="relative cursor-pointer aspect-square overflow-hidden"
                        onClick={() => openImageViewer(post.images)}
                      >
                        <img
                          src={`${API_BASE_URL}${img}`}
                          alt={`post image ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {post.images.length > 4 && i === 3 && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white text-4xl font-bold drop-shadow-lg">
                              +{post.images.length - 4}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-around py-1 px-4 border-t border-gray-200 dark:border-gray-800">
                  <button
                    onClick={() => handleLike(post._id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 ${
                      isLikedByMe(post) ? 'text-blue-600' : 'text-gray-600 dark:text-gray-400'
                    } hover:bg-gray-100 dark:hover:bg-gray-800`}
                  >
                    <Heart size={20} className={isLikedByMe(post) ? 'fill-current' : ''} />
                    <span className="text-sm">{post.likes?.length || 0}</span>
                  </button>

                  <button className="flex-1 flex items-center justify-center gap-2 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <MessageCircle size={20} />
                    <span className="text-sm">{post.comments?.length || 0}</span>
                  </button>

                  <button className="flex-1 flex items-center justify-center gap-2 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <Share2 size={20} />
                    <span className="text-sm">শেয়ার</span>
                  </button>
                </div>

                {/* Comments Preview */}
                {post.comments?.length > 0 && (
                  <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-800">
                    {post.comments.slice(0, 2).map((c) => (
                      <div key={c._id} className="flex gap-2 mb-2">
                        <div className="w-7 h-7 rounded-full bg-gray-300 dark:bg-gray-700 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{formatName(c.user)}</p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{c.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Comment Input */}
                <div className="flex items-center gap-2 px-4 py-3 border-t border-gray-200 dark:border-gray-800">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-sm">
                    {formatName(user)[0]}
                  </div>
                  <input
                    type="text"
                    value={commentInputs[post._id] || ''}
                    onChange={(e) => setCommentInputs((prev) => ({ ...prev, [post._id]: e.target.value }))}
                    onKeyDown={(e) => e.key === 'Enter' && handleComment(post._id)}
                    placeholder="কমেন্ট লিখুন..."
                    className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 text-sm focus:outline-none"
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Story Viewer */}
      {selectedStoryIndex !== null && (
        <StoryViewer
          stories={stories}
          initialIndex={selectedStoryIndex}
          onClose={closeStoryViewer}
        />
      )}

      {/* Multi Image Viewer */}
      {selectedPostImages && (
        <MultiImageViewer
          images={selectedPostImages}
          initialIndex={0}
          onClose={closeImageViewer}
        />
      )}
    </>
  );
};

export default HomePage;