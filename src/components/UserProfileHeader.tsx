
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Trophy, Edit, Save, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Profile {
  id: string;
  user_id: string;
  username: string | null;
  avatar_url: string | null;
  bio: string | null;
  location: string | null;
  created_at: string;
}

const UserProfileHeader = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    username: '',
    bio: '',
    location: '',
    avatar_url: ''
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setProfile(data);
        setEditForm({
          username: data.username || '',
          bio: data.bio || '',
          location: data.location || '',
          avatar_url: data.avatar_url || ''
        });
      } else {
        // Create profile if it doesn't exist
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert([{
            user_id: user.id,
            username: user.email?.split('@')[0] || 'User'
          }])
          .select()
          .single();

        if (createError) throw createError;
        
        setProfile(newProfile);
        setEditForm({
          username: newProfile.username || '',
          bio: newProfile.bio || '',
          location: newProfile.location || '',
          avatar_url: newProfile.avatar_url || ''
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user || !profile) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          username: editForm.username,
          bio: editForm.bio,
          location: editForm.location,
          avatar_url: editForm.avatar_url
        })
        .eq('user_id', user.id);

      if (error) throw error;

      await fetchProfile();
      setEditing(false);
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    if (profile) {
      setEditForm({
        username: profile.username || '',
        bio: profile.bio || '',
        location: profile.location || '',
        avatar_url: profile.avatar_url || ''
      });
    }
    setEditing(false);
  };

  if (loading) {
    return (
      <Card className="bg-card border border-border">
        <CardContent className="p-6">
          <div className="animate-pulse">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-muted rounded-full"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-6 bg-muted rounded w-1/3"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-4 bg-muted rounded w-1/4"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card className="bg-card border border-border">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <Avatar className="w-20 h-20 md:w-24 md:h-24">
              <AvatarFallback className="text-xl font-bold bg-muted text-muted-foreground">?</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-3">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-muted-foreground">No Profile Yet</h1>
                <p className="text-muted-foreground">Sign in to create your profile</p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-muted-foreground border-border">
                  <Trophy className="w-3 h-3 mr-1" />
                  No Rank Yet
                </Badge>
                <Badge variant="outline" className="text-muted-foreground border-border">New User</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card border border-border">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-start gap-4">
          <div className="flex flex-col items-center md:items-start">
            <Avatar className="w-20 h-20 md:w-24 md:h-24">
              {profile?.avatar_url && <AvatarImage src={profile.avatar_url} alt={profile.username || 'Avatar'} />}
              <AvatarFallback className="text-xl font-bold bg-primary text-primary-foreground">
                {profile?.username?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            {editing && (
              <Input
                placeholder="Avatar URL"
                value={editForm.avatar_url}
                onChange={(e) => setEditForm({ ...editForm, avatar_url: e.target.value })}
                className="mt-2 w-full max-w-[200px]"
              />
            )}
          </div>
          
          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {editing ? (
                  <div className="space-y-2">
                    <Input
                      placeholder="Username"
                      value={editForm.username}
                      onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                      className="text-lg font-bold"
                    />
                    <Textarea
                      placeholder="Tell us about yourself..."
                      value={editForm.bio}
                      onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                      className="resize-none"
                      rows={3}
                    />
                  </div>
                ) : (
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                      {profile?.username || user.email?.split('@')[0] || 'User'}
                    </h1>
                    {profile?.bio && (
                      <p className="text-muted-foreground mt-1">{profile.bio}</p>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex gap-2 ml-4">
                {editing ? (
                  <>
                    <Button onClick={handleSave} size="sm" className="flex items-center gap-1">
                      <Save className="w-4 h-4" />
                      Save
                    </Button>
                    <Button onClick={handleCancel} variant="outline" size="sm" className="flex items-center gap-1">
                      <X className="w-4 h-4" />
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setEditing(true)} variant="outline" size="sm" className="flex items-center gap-1">
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                )}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Trophy className="w-3 h-3" />
                Music Explorer
              </Badge>
              <Badge variant="outline">Active Member</Badge>
              <Badge variant="outline">Discovery Streak: 7</Badge>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Joined {new Date(profile?.created_at || '').toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {editing ? (
                  <Input
                    placeholder="Location"
                    value={editForm.location}
                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                    className="h-6 text-sm"
                  />
                ) : (
                  <span>{profile?.location || 'Location not set'}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileHeader;
