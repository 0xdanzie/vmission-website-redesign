'use client';

import React, { createContext, useContext, useReducer, useRef, useCallback } from 'react';
import type { Teaching } from '@/data/teachings';
import { getAssetPath } from '@/utils/assetPath';

interface PlayerState {
  track: Teaching | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  speed: number;
  isMinimized: boolean;
  isVisible: boolean;
}

type PlayerAction =
  | { type: 'PLAY'; track: Teaching }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'TOGGLE' }
  | { type: 'SET_TIME'; time: number }
  | { type: 'SET_DURATION'; duration: number }
  | { type: 'SET_SPEED'; speed: number }
  | { type: 'MINIMIZE' }
  | { type: 'EXPAND' }
  | { type: 'CLOSE' };

const initialState: PlayerState = {
  track: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  speed: 1,
  isMinimized: false,
  isVisible: false,
};

function playerReducer(state: PlayerState, action: PlayerAction): PlayerState {
  switch (action.type) {
    case 'PLAY':
      return { ...state, track: action.track, isPlaying: true, isVisible: true, currentTime: 0, isMinimized: false };
    case 'PAUSE':
      return { ...state, isPlaying: false };
    case 'RESUME':
      return { ...state, isPlaying: true };
    case 'TOGGLE':
      return { ...state, isPlaying: !state.isPlaying };
    case 'SET_TIME':
      return { ...state, currentTime: action.time };
    case 'SET_DURATION':
      return { ...state, duration: action.duration };
    case 'SET_SPEED':
      return { ...state, speed: action.speed };
    case 'MINIMIZE':
      return { ...state, isMinimized: true };
    case 'EXPAND':
      return { ...state, isMinimized: false };
    case 'CLOSE':
      return { ...initialState };
    default:
      return state;
  }
}

interface PlayerContextValue {
  state: PlayerState;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  play: (track: Teaching) => void;
  pause: () => void;
  toggle: () => void;
  seek: (time: number) => void;
  setSpeed: (speed: number) => void;
  minimize: () => void;
  expand: () => void;
  close: () => void;
}

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function AudioPlayerProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(playerReducer, initialState);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = useCallback((track: Teaching) => {
    dispatch({ type: 'PLAY', track });
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.src = getAssetPath(track.src || '/audio/demo-discourse.mp3');
        audioRef.current.playbackRate = state.speed;
        audioRef.current.play().catch(() => {});
      }
    }, 50);
  }, [state.speed]);

  const pause = useCallback(() => {
    dispatch({ type: 'PAUSE' });
    audioRef.current?.pause();
  }, []);

  const toggle = useCallback(() => {
    if (state.isPlaying) {
      dispatch({ type: 'PAUSE' });
      audioRef.current?.pause();
    } else {
      dispatch({ type: 'RESUME' });
      audioRef.current?.play().catch(() => {});
    }
  }, [state.isPlaying]);

  const seek = useCallback((time: number) => {
    if (audioRef.current) audioRef.current.currentTime = time;
    dispatch({ type: 'SET_TIME', time });
  }, []);

  const setSpeed = useCallback((speed: number) => {
    dispatch({ type: 'SET_SPEED', speed });
    if (audioRef.current) audioRef.current.playbackRate = speed;
  }, []);

  const minimize = useCallback(() => dispatch({ type: 'MINIMIZE' }), []);
  const expand = useCallback(() => dispatch({ type: 'EXPAND' }), []);
  const close = useCallback(() => {
    audioRef.current?.pause();
    dispatch({ type: 'CLOSE' });
  }, []);

  return (
    <PlayerContext.Provider value={{ state, audioRef, play, pause, toggle, seek, setSpeed, minimize, expand, close }}>
      {children}
      <audio
        ref={audioRef}
        onTimeUpdate={() => {
          if (audioRef.current) dispatch({ type: 'SET_TIME', time: audioRef.current.currentTime });
        }}
        onLoadedMetadata={() => {
          if (audioRef.current) dispatch({ type: 'SET_DURATION', duration: audioRef.current.duration });
        }}
        onEnded={() => dispatch({ type: 'PAUSE' })}
        preload="metadata"
      />
    </PlayerContext.Provider>
  );
}

export function useAudioPlayer(): PlayerContextValue {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('useAudioPlayer must be used within AudioPlayerProvider');
  return ctx;
}
