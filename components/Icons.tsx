/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/




import React from 'react';

// A generic wrapper for SVG icons to handle common props
const SvgIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, children, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
    width="24"
    height="24"
    {...props}
  >
    {children}
  </svg>
);

// Header Icons
export const UndoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgIcon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" /></SvgIcon>
);
export const RedoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgIcon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" /></SvgIcon>
);
export const SaveIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <SvgIcon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></SvgIcon>
);
export const LoadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <SvgIcon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></SvgIcon>
);
export const DocumentPlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <SvgIcon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></SvgIcon>
);
export const GearIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <SvgIcon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></SvgIcon>
);
export const CodeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <SvgIcon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></SvgIcon>
);

// Playback Icons
export const PlayIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <SvgIcon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" /></SvgIcon>
);
export const PauseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <SvgIcon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" /></SvgIcon>
);
export const StopIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <SvgIcon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" /></SvgIcon>
);
export const ArrowPathIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <SvgIcon {...props}>
      <path d="M23 4v6h-6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" strokeLinecap="round" strokeLinejoin="round" />
    </SvgIcon>
);

// Volume Icons
export const SpeakerWaveIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgIcon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" /></SvgIcon>
);
export const SpeakerQuietIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgIcon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5-12l3.32-3.32a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-3.32-3.32H6.75a2.25 2.25 0 01-2.25-2.25v-3a2.25 2.25 0 012.25-2.25h3z" /></SvgIcon>
);
export const SpeakerXMarkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgIcon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" /></SvgIcon>
);
export const RocketLaunchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <SvgIcon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </SvgIcon>
);

// Panel Icons
export const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgIcon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.553L16.5 21.75l-.398-1.197a3.375 3.375 0 00-2.456-2.456L12.75 18l1.197-.398a3.375 3.375 0 002.456-2.456L16.5 14.25l.398 1.197a3.375 3.375 0 002.456 2.456L20.25 18l-1.197.398a3.375 3.375 0 00-2.456 2.456z" /></SvgIcon>
);
export const QuestionMarkCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgIcon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></SvgIcon>
);
export const MagicWandIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgIcon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.998 15.998 0 011.622-3.385m5.043.025a15.998 15.998 0 001.622-3.385m3.388 1.62a15.998 15.998 0 00-1.622-3.385m-5.043-.025a15.998 15.998 0 01-3.388-1.621m7.704 4.242a3 3 0 00-4.242 0M5.042 15.75a3 3 0 000 4.242m3.537-3.536a15.998 15.998 0 011.622 3.385m-1.622-3.385a15.998 15.998 0 00-1.622 3.385m0 0a15.998 15.998 0 013.388 1.621m-3.388-1.621a15.998 15.998 0 00-3.388 1.621m0 0a15.998 15.998 0 00-1.622-3.385m3.388 1.622a15.998 15.998 0 01-1.622-3.385" /></SvgIcon>
);
export const LightBulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgIcon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></SvgIcon>
);
export const AdjustmentsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgIcon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></SvgIcon>
);
export const XCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgIcon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></SvgIcon>
);

export const ShieldCheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgIcon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751A11.956 11.956 0 0112 2.714z" /></SvgIcon>
);

export const GlobeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgIcon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9m0 0a9.015 9.015 0 018.716 2.253M12 3a9.015 9.015 0 00-8.716 2.253m0 0A9.015 9.015 0 0112 12a9.015 9.015 0 0112 12" /></SvgIcon>
);

export const SendIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgIcon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></SvgIcon>
);

export const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgIcon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></SvgIcon>
);

export const MapPinIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgIcon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></SvgIcon>
);

export const BrainIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgIcon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6c0-3.314-2.686-6-6-6s-6 2.686-6 6a6 6 0 006 6z" /><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></SvgIcon>
);

export const BotIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgIcon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></SvgIcon>
);

export const ImageIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgIcon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></SvgIcon>
);

export const MovieIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgIcon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125V5.625a1.125 1.125 0 011.125-1.125h17.25a1.125 1.125 0 011.125 1.125v12.75a1.125 1.125 0 01-1.125 1.125m-17.25 0V5.625m17.25 13.875V5.625M12 8.25v3.75m0 0l3.75-3.75M12 12l-3.75-3.75" /></SvgIcon>
);

export const MicIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgIcon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" /></SvgIcon>
);

export const MicOffIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgIcon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3zM3 3l18 18" /></SvgIcon>
);

export const Volume2Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgIcon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51a.75.75 0 01-.75-.75V9a.75.75 0 01.75-.75h2.24z" /></SvgIcon>
);

export const VolumeXIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgIcon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9l4.5 4.5m0-4.5l-4.5 4.5M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51a.75.75 0 01-.75-.75V9a.75.75 0 01.75-.75h2.24z" /></SvgIcon>
);

export const ActivityIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgIcon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></SvgIcon>
);

export const CameraIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgIcon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15a2.25 2.25 0 002.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" /></SvgIcon>
);

export const UploadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgIcon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></SvgIcon>
);

export const WandIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgIcon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" /></SvgIcon>
);

export const TrashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgIcon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></SvgIcon>
);

export const DownloadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgIcon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></SvgIcon>
);

export const UserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgIcon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></SvgIcon>
);

// D-Pad Icons
export const ChevronUpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <SvgIcon {...props} strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" /></SvgIcon>
);
export const ChevronDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <SvgIcon {...props} strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></SvgIcon>
);
export const ChevronLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <SvgIcon {...props} strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></SvgIcon>
);
export const ChevronRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <SvgIcon {...props} strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></SvgIcon>
);
export const PaperclipIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgIcon {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32a1.5 1.5 0 11-2.121-2.121L16.11 6.516" /></SvgIcon>
);

export const TerraformIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24" strokeWidth={1.5}>
    <circle cx="12" cy="12" r="3" />
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(45 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-45 12 12)" />
  </SvgIcon>
);