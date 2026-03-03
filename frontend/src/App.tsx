import { useState, useEffect } from 'react';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useQueries';
import { applyTheme, getStoredTheme } from './lib/theme';
import LandingPage from './pages/LandingPage';
import ProfileSetupPage from './pages/ProfileSetupPage';
import AppLayout from './components/AppLayout';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import CreatePostPage from './pages/CreatePostPage';
import ChatListPage from './pages/ChatListPage';
import ChatThreadPage from './pages/ChatThreadPage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import NotificationsPage from './pages/NotificationsPage';
import PostDetailPage from './pages/PostDetailPage';
import StoryViewerPage from './pages/StoryViewerPage';
import CreateStoryPage from './pages/CreateStoryPage';

export type AppPage =
  | 'home'
  | 'search'
  | 'create-post'
  | 'chat'
  | 'chat-thread'
  | 'profile'
  | 'edit-profile'
  | 'notifications'
  | 'post-detail'
  | 'story-viewer'
  | 'create-story';

export interface NavigationState {
  page: AppPage;
  params?: Record<string, string>;
}

export default function App() {
  const { identity, isInitializing } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const [nav, setNav] = useState<NavigationState>({ page: 'home' });

  // Apply stored theme on mount
  useEffect(() => {
    applyTheme(getStoredTheme());
  }, []);

  const navigate = (page: AppPage, params?: Record<string, string>) => {
    setNav({ page, params });
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-hero">
        <div className="flex flex-col items-center gap-4">
          <img
            src="/assets/generated/connectsphere-logo.dim_256x256.png"
            alt="ConnectSphere"
            className="w-16 h-16 rounded-2xl animate-pulse"
          />
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LandingPage />;
  }

  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  if (showProfileSetup) {
    return <ProfileSetupPage onComplete={() => setNav({ page: 'home' })} />;
  }

  if (profileLoading && !isFetched) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const renderPage = () => {
    switch (nav.page) {
      case 'home':
        return <HomePage navigate={navigate} />;
      case 'search':
        return <SearchPage navigate={navigate} />;
      case 'create-post':
        return <CreatePostPage navigate={navigate} />;
      case 'chat':
        return <ChatListPage navigate={navigate} />;
      case 'chat-thread':
        return <ChatThreadPage navigate={navigate} conversationId={nav.params?.conversationId || '1'} />;
      case 'profile':
        return <ProfilePage navigate={navigate} userProfile={userProfile} />;
      case 'edit-profile':
        return <EditProfilePage navigate={navigate} userProfile={userProfile} />;
      case 'notifications':
        return <NotificationsPage navigate={navigate} />;
      case 'post-detail':
        return <PostDetailPage navigate={navigate} postId={nav.params?.postId || '1'} />;
      case 'story-viewer':
        return <StoryViewerPage navigate={navigate} storyId={nav.params?.storyId || '1'} />;
      case 'create-story':
        return <CreateStoryPage navigate={navigate} />;
      default:
        return <HomePage navigate={navigate} />;
    }
  };

  const showBottomNav = !['create-post', 'create-story', 'story-viewer', 'post-detail', 'edit-profile', 'chat-thread'].includes(nav.page);

  return (
    <AppLayout
      navigate={navigate}
      currentPage={nav.page}
      showBottomNav={showBottomNav}
    >
      {renderPage()}
    </AppLayout>
  );
}
