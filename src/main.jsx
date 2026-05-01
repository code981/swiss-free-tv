import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { CheckCircle2, Download, ExternalLink, Lock, PlayCircle, Plus, Search, ShieldCheck, Sparkles, Star, Trash2, Tv, Upload, WifiOff } from 'lucide-react';
import './styles.css';

const channels = [
  {
    id: 'srf1',
    name: 'SRF 1',
    region: 'Deutschschweiz',
    language: 'DE',
    type: 'Official',
    description: 'Swiss public TV: news, culture, entertainment and live events.',
    officialUrl: 'https://www.srf.ch/play/tv/live/srf-1?tvLiveId=c4927fcf-e1a0-0001-7edd-1ef01d441651',
    streamUrl: '',
  },
  {
    id: 'srfzwei',
    name: 'SRF zwei',
    region: 'Deutschschweiz',
    language: 'DE',
    type: 'Official',
    description: 'Sports, documentaries, series and live specials from SRF.',
    officialUrl: 'https://www.srf.ch/play/tv/live/srf-zwei?tvLiveId=c49c1d64-9f60-0001-1c36-43c288c01a10',
    streamUrl: '',
  },
  {
    id: 'srfinfo',
    name: 'SRF info',
    region: 'Deutschschweiz',
    language: 'DE',
    type: 'Official',
    description: 'News, current affairs, replays and information programming.',
    officialUrl: 'https://www.srf.ch/play/tv/live/srf-info?tvLiveId=c49c1d73-2f70-0001-138a-15e0c4ccd3d0',
    streamUrl: '',
  },
  {
    id: 'rts1',
    name: 'RTS 1',
    region: 'Romandie',
    language: 'FR',
    type: 'Official',
    description: 'French-speaking Swiss public TV by RTS.',
    officialUrl: 'https://www.rts.ch/play/tv/direct/rts-1?tvLiveId=3608506',
    streamUrl: '',
  },
  {
    id: 'rts2',
    name: 'RTS 2',
    region: 'Romandie',
    language: 'FR',
    type: 'Official',
    description: 'Sports, culture, documentaries and second-channel programming.',
    officialUrl: 'https://www.rts.ch/play/tv/direct/rts-2?tvLiveId=3608517',
    streamUrl: '',
  },
  {
    id: 'rtsinfo',
    name: 'RTS Info',
    region: 'Romandie',
    language: 'FR',
    type: 'Official',
    description: 'Continuous news and information from RTS.',
    officialUrl: 'https://www.rts.ch/play/tv/direct/rts-info?tvLiveId=1967124',
    streamUrl: '',
  },
  {
    id: 'rsi1',
    name: 'RSI LA 1',
    region: 'Svizzera italiana',
    language: 'IT',
    type: 'Official',
    description: 'Italian-speaking Swiss public TV by RSI.',
    officialUrl: 'https://www.rsi.ch/play/tv/live/la-1?tvLiveId=livestream_La1',
    streamUrl: '',
  },
  {
    id: 'rsi2',
    name: 'RSI LA 2',
    region: 'Svizzera italiana',
    language: 'IT',
    type: 'Official',
    description: 'Sports, events and second-channel programming from RSI.',
    officialUrl: 'https://www.rsi.ch/play/tv/live/la-2?tvLiveId=livestream_La2',
    streamUrl: '',
  },
  {
    id: 'telezueri',
    name: 'TeleZüri',
    region: 'Zürich',
    language: 'DE',
    type: 'Regional official',
    description: 'Regional news and programming for Zürich.',
    officialUrl: 'https://www.telezueri.ch/live',
    streamUrl: '',
  },
  {
    id: 'telebaern',
    name: 'TeleBärn',
    region: 'Bern',
    language: 'DE',
    type: 'Regional official',
    description: 'Regional TV for Bern and surrounding areas.',
    officialUrl: 'https://www.telebaern.tv/live',
    streamUrl: '',
  },
  {
    id: 'telem1',
    name: 'Tele M1',
    region: 'Aargau/Solothurn',
    language: 'DE',
    type: 'Regional official',
    description: 'Regional TV for Aargau, Solothurn and nearby regions.',
    officialUrl: 'https://www.telem1.ch/live',
    streamUrl: '',
  },
  {
    id: 'tele1',
    name: 'Tele 1',
    region: 'Zentralschweiz',
    language: 'DE',
    type: 'Regional official',
    description: 'Regional TV for Central Switzerland.',
    officialUrl: 'https://www.tele1.ch/live',
    streamUrl: '',
  },
  {
    id: 'tvo',
    name: 'TVO',
    region: 'Ostschweiz',
    language: 'DE',
    type: 'Regional official',
    description: 'Regional TV for Eastern Switzerland.',
    officialUrl: 'https://www.tvo-online.ch/live',
    streamUrl: '',
  },
  {
    id: 'telebasel',
    name: 'Telebasel',
    region: 'Basel/Nordwestschweiz',
    language: 'DE',
    type: 'Regional official',
    description: 'Regional TV for Basel and Northwestern Switzerland.',
    officialUrl: 'https://telebasel.ch/livestream',
    streamUrl: '',
  },
  {
    id: 'teletop',
    name: 'TELE TOP',
    region: 'Zürich/Thurgau/Schaffhausen',
    language: 'DE',
    type: 'Regional official',
    description: 'Regional TV for Winterthur, Zürich, Thurgau and Schaffhausen.',
    officialUrl: 'https://www.toponline.ch/tele-top',
    streamUrl: '',
  },
  {
    id: 'canal9',
    name: 'Canal9 / Kanal9',
    region: 'Valais/Wallis',
    language: 'FR/DE',
    type: 'Regional official',
    description: 'Regional public-service TV for Valais / Wallis.',
    officialUrl: 'https://canal9.ch/fr/',
    streamUrl: '',
  },
  {
    id: 'lemanbleu',
    name: 'Léman Bleu',
    region: 'Genève',
    language: 'FR',
    type: 'Regional official',
    description: 'Geneva regional TV. Official site may block embedding; use Open if needed.',
    officialUrl: 'https://www.lemanbleu.ch/fr/Direct/Direct.html',
    streamUrl: '',
  },
  {
    id: 'canal-alpha-jura',
    name: 'Canal Alpha Jura',
    region: 'Jura',
    language: 'FR',
    type: 'Public stream',
    description: 'Regional television for Jura with a verified public HLS stream.',
    officialUrl: 'https://www.canalalpha.ch/',
    streamUrl: 'https://canalalphaju.vedge.infomaniak.com/livecast/ik:canalalphaju/playlist.m3u8',
  },
  {
    id: 'canal-alpha-neuchatel',
    name: 'Canal Alpha Neuchâtel',
    region: 'Neuchâtel',
    language: 'FR',
    type: 'Public stream',
    description: 'Regional television for Neuchâtel. Stream may not be 24/7.',
    officialUrl: 'https://www.canalalpha.ch/',
    streamUrl: 'https://canalalpha.vedge.infomaniak.com/livecast/ik:canalalpha/playlist.m3u8',
  },
  {
    id: 'carac1',
    name: 'Carac 1',
    region: 'Romandie',
    language: 'FR',
    type: 'Public stream',
    description: 'Swiss regional entertainment/music channel with a verified public HLS stream.',
    officialUrl: 'https://www.carac.tv/',
    streamUrl: 'https://edge13.vedge.infomaniak.com/livecast/ik:event/manifest.m3u8',
  },
  {
    id: 'couleur3-video',
    name: 'Couleur 3 Video',
    region: 'Romandie',
    language: 'FR',
    type: 'Public stream',
    description: 'RTS Couleur 3 visual radio/video stream.',
    officialUrl: 'https://www.rts.ch/audio-podcast/2021/emission/couleur-3-25000474.html',
    streamUrl: 'https://rtsc3video.akamaized.net/hls/live/2042837/c3video/3/playlist.m3u8',
  },
  {
    id: 'meteonews',
    name: 'Meteonews TV',
    region: 'Switzerland',
    language: 'DE/FR',
    type: 'Public stream',
    description: 'Swiss weather information TV stream.',
    officialUrl: 'https://www.meteonews.ch/',
    streamUrl: 'https://streaming.meteonews.net/hls/stream.m3u8',
  },
  {
    id: 'qs24',
    name: 'QS24',
    region: 'Switzerland',
    language: 'DE',
    type: 'Public stream',
    description: 'Swiss health and talk channel with a verified public HLS stream.',
    officialUrl: 'https://qs24.tv/',
    streamUrl: 'https://h030.video-stream-hosting.de/quantisana-live/_definst_/smil:livestream.smil/playlist.m3u8',
  },
  {
    id: 'radio3i-tv',
    name: 'Radio 3i TV',
    region: 'Ticino',
    language: 'IT',
    type: 'Public stream',
    description: 'Ticino visual radio / TV stream.',
    officialUrl: 'https://www.radio3i.ch/',
    streamUrl: 'https://vstream-cdn.ch/hls/radio3i.m3u8',
  },
  {
    id: 'teleticino',
    name: 'TeleTicino',
    region: 'Ticino',
    language: 'IT',
    type: 'Public stream',
    description: 'Regional TV for Ticino with a verified public HLS stream.',
    officialUrl: 'https://www.teleticino.ch/',
    streamUrl: 'https://vstream-cdn.ch/hls/teleticino.m3u8',
  },
  {
    id: 'tvm3',
    name: 'TVM3',
    region: 'Romandie',
    language: 'FR',
    type: 'Public stream',
    description: 'Swiss private music/entertainment TV channel with a verified public HLS stream.',
    officialUrl: 'https://www.tvm3.tv/',
    streamUrl: 'https://livevideo.infomaniak.com/streaming/livecast/tvm3/playlist.m3u8',
  },
  {
    id: 'arte',
    name: 'ARTE',
    region: 'Europe',
    language: 'DE/FR',
    type: 'Official',
    description: 'Culture, documentaries and films. Official page may block embedding.',
    officialUrl: 'https://www.arte.tv/de/live',
    streamUrl: '',
  },
  {
    id: '3sat',
    name: '3sat',
    region: 'DACH',
    language: 'DE',
    type: 'Official',
    description: 'Public cultural channel by German-speaking broadcasters. Direct stream not embedded until a reliable official public HLS source is verified.',
    officialUrl: 'https://www.ardmediathek.de/live/Y3JpZDovLzNzYXQuZGUvTGl2ZXN0cmVhbS0zc2F0',
    streamUrl: '',
  },
  {
    id: 'daserste',
    name: 'Das Erste',
    region: 'DACH',
    language: 'DE',
    type: 'Public stream',
    description: 'German public broadcaster with a verified public HLS livestream.',
    officialUrl: 'https://www.ardmediathek.de/daserste/live',
    streamUrl: 'https://daserste-live.ard-mcdn.de/daserste/live/hls/de/master.m3u8',
  },
  {
    id: 'dw',
    name: 'DW English',
    region: 'International',
    language: 'EN',
    type: 'Public stream',
    description: 'International news channel from Deutsche Welle.',
    officialUrl: 'https://learngerman.dw.com/en/live-tv/s-100825',
    streamUrl: 'https://dwamdstream103.akamaized.net/hls/live/2015526/dwstream103/index.m3u8',
  },
];

const legalProviders = [
  {
    name: 'Teleboy',
    url: 'https://www.teleboy.ch/tv',
    badge: 'Free + Plus',
    highlight: 'Strong Swiss TV UX: live TV, replay, recording on paid plans, broad channel catalog.',
  },
  {
    name: 'Zattoo Switzerland',
    url: 'https://zattoo.com/ch',
    badge: 'Free + Ultimate',
    highlight: 'Large licensed channel lineup, 7-day replay and recording on paid plans.',
  },
  {
    name: 'blue TV Air',
    url: 'https://www.swisscom.ch/de/privatkunden/tv-abo/blue-tv-app.html',
    badge: 'Free tier',
    highlight: 'Swisscom’s legal app access, including free TV Air entry tier and paid replay/recording options.',
  },
  {
    name: 'Wilmaa',
    url: 'https://www.wilmaa.com/',
    badge: 'Swiss TV app',
    highlight: 'Licensed Swiss TV app model with account-based access instead of exposed raw streams.',
  },
];

function Player({ channel }) {
  const videoRef = useRef(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
    const video = videoRef.current;
    if (!video || !channel?.streamUrl) return;

    let hls;
    let cancelled = false;

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = channel.streamUrl;
      return undefined;
    }

    import('hls.js').then(({ default: Hls }) => {
      if (cancelled) return;
      if (Hls.isSupported()) {
        hls = new Hls({ enableWorker: true, lowLatencyMode: true });
        hls.loadSource(channel.streamUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.ERROR, (_event, data) => {
          if (data?.fatal) setError('This stream failed to load. Use the official source link below.');
        });
      } else {
        setError('Your browser cannot play HLS streams directly. Use the official source link.');
      }
    });

    return () => {
      cancelled = true;
      hls?.destroy();
    };
  }, [channel]);

  if (!channel) return null;

  const playable = Boolean(channel.streamUrl);

  return (
    <section className="playerPanel">
      <div className="playerHeader">
        <div>
          <p className="eyebrow">{playable ? 'Live in app' : 'Listed channel'}</p>
          <h2>{channel.name}</h2>
          <p>{channel.description}</p>
        </div>
        <a className="officialButton" href={channel.officialUrl} target="_blank" rel="noreferrer">
          Official source <ExternalLink size={16} />
        </a>
      </div>

      {playable ? (
        <div className="videoWrap">
          <video ref={videoRef} controls autoPlay muted playsInline poster="" />
          {error && <div className="videoError"><WifiOff size={18} /> {error}</div>}
        </div>
      ) : (
        <div className="lockedPlayer">
          <Lock size={42} />
          <h3>No native stream embedded</h3>
          <p>
            This channel is listed for discovery, but we do not show the broadcaster website inside the app and we do not proxy, scrape, or bypass ads/paywalls. A native player will be added only when a legal direct stream or partner API is available.
          </p>
          <a className="primary" href={channel.officialUrl} target="_blank" rel="noreferrer">Open official source</a>
        </div>
      )}
    </section>
  );
}

function App() {
  const importRef = useRef(null);
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('All');
  const [mode, setMode] = useState('All');
  const [recentIds, setRecentIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem('swiss-tv:recent') || '[]'); }
    catch { return []; }
  });
  const [customName, setCustomName] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [customRegion, setCustomRegion] = useState('Private');
  const [customLanguage, setCustomLanguage] = useState('DE');
  const [customError, setCustomError] = useState('');
  const [customChannels, setCustomChannels] = useState(() => {
    try { return JSON.parse(localStorage.getItem('swiss-tv:custom-channels') || '[]'); }
    catch { return []; }
  });
  const [selectedId, setSelectedId] = useState(() => localStorage.getItem('swiss-tv:selected-channel') || channels.find((c) => c.streamUrl)?.id || channels[0].id);
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('swiss-tv:favorites') || '[]'); }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('swiss-tv:selected-channel', selectedId);
  }, [selectedId]);

  useEffect(() => {
    localStorage.setItem('swiss-tv:favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('swiss-tv:custom-channels', JSON.stringify(customChannels));
  }, [customChannels]);

  useEffect(() => {
    localStorage.setItem('swiss-tv:recent', JSON.stringify(recentIds));
  }, [recentIds]);

  const allChannels = useMemo(() => [...customChannels, ...channels], [customChannels]);
  const playableCount = allChannels.filter((c) => c.streamUrl).length;
  const selected = allChannels.find((c) => c.id === selectedId) || allChannels.find((c) => c.streamUrl) || allChannels[0];
  const favoriteSet = new Set(favorites);
  const recentChannels = recentIds.map((id) => allChannels.find((channel) => channel.id === id)).filter(Boolean).slice(0, 4);
  const featuredPlayable = allChannels.filter((channel) => channel.streamUrl).slice(0, 6);
  const selectChannel = (id) => {
    setSelectedId(id);
    setRecentIds((current) => [id, ...current.filter((item) => item !== id)].slice(0, 8));
  };
  const toggleFavorite = (id) => setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const resetFilters = () => {
    setQuery('');
    setLanguage('All');
    setMode('All');
  };

  const addCustomChannel = (event) => {
    event.preventDefault();
    setCustomError('');

    try {
      const url = new URL(customUrl.trim());
      if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Unsupported URL protocol');
      const id = `custom-${Date.now()}`;
      setCustomChannels((current) => [{
        id,
        name: customName.trim() || 'Private stream',
        region: customRegion.trim() || 'Private',
        language: customLanguage,
        type: 'Private stream',
        description: 'Private local entry stored only in this browser.',
        officialUrl: url.href,
        streamUrl: url.href,
        custom: true,
      }, ...current]);
      selectChannel(id);
      setCustomName('');
      setCustomUrl('');
    } catch {
      setCustomError('Enter a valid http(s) HLS/stream URL, for example https://…/playlist.m3u8');
    }
  };

  const removeCustomChannel = (id) => {
    setCustomChannels((current) => current.filter((channel) => channel.id !== id));
    setFavorites((current) => current.filter((item) => item !== id));
    if (selectedId === id) selectChannel(channels.find((c) => c.streamUrl)?.id || channels[0].id);
  };

  const exportPrivateChannels = () => {
    const blob = new Blob([JSON.stringify({ version: 1, channels: customChannels }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'swiss-tv-private-channels.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const importPrivateChannels = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result || '{}'));
        const incoming = Array.isArray(parsed) ? parsed : parsed.channels;
        if (!Array.isArray(incoming)) throw new Error('Invalid channel backup');
        const sanitized = incoming
          .filter((channel) => channel?.name && channel?.streamUrl)
          .map((channel, index) => ({
            id: `custom-import-${Date.now()}-${index}`,
            name: String(channel.name).slice(0, 80),
            region: String(channel.region || 'Private').slice(0, 80),
            language: String(channel.language || 'DE').slice(0, 12),
            type: 'Private stream',
            description: 'Private local entry imported into this browser.',
            officialUrl: String(channel.officialUrl || channel.streamUrl),
            streamUrl: String(channel.streamUrl),
            custom: true,
          }));
        setCustomChannels((current) => [...sanitized, ...current]);
        setCustomError(sanitized.length ? `Imported ${sanitized.length} private stream${sanitized.length === 1 ? '' : 's'}.` : 'No valid private streams found in that file.');
      } catch {
        setCustomError('Could not import that file. Use a JSON backup exported from this app.');
      } finally {
        event.target.value = '';
      }
    };
    reader.readAsText(file);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allChannels.filter((c) => {
      const matchesQuery = !q || [c.name, c.region, c.language, c.description].join(' ').toLowerCase().includes(q);
      const matchesLanguage = language === 'All' || c.language.includes(language);
      const matchesMode = mode === 'All'
        || (mode === 'Playable' ? c.streamUrl : mode === 'Favorites' ? favoriteSet.has(c.id) : !c.streamUrl);
      return matchesQuery && matchesLanguage && matchesMode;
    });
  }, [query, language, mode, favorites, allChannels]);

  return (
    <main>
      <section className="hero">
        <div>
          <p className="eyebrow">Switzerland • instant TV launcher • no app ads</p>
          <h1>Swiss TV, one clean screen.</h1>
          <p className="heroText">
            Watch verified public streams directly, jump to official broadcaster pages, save favorites, and keep your own private HLS list in this browser. Fast, installable, and privacy-friendly.
          </p>
          <div className="heroActions">
            <button className="primary" type="button" onClick={() => setMode('Playable')}><PlayCircle size={17} /> Show playable</button>
            <button className="secondary" type="button" onClick={() => setMode('Favorites')}><Star size={17} /> Favorites</button>
            <a className="secondary" href="#private-streams"><Plus size={17} /> Add stream</a>
          </div>
        </div>
        <div className="trustBox">
          <ShieldCheck size={28} />
          <strong>Clean by design</strong>
          <span>No trackers, no iframes, no proxying. {playableCount} sources can play in-app now; private entries stay local.</span>
          <div className="trustList">
            <span><CheckCircle2 size={15} /> PWA-ready</span>
            <span><CheckCircle2 size={15} /> Favorites</span>
            <span><CheckCircle2 size={15} /> Import/export</span>
          </div>
        </div>
      </section>

      <section className="quickPanel">
        <div>
          <p className="eyebrow">Start fast</p>
          <h2>Featured playable channels</h2>
        </div>
        <div className="quickGrid">
          {featuredPlayable.map((channel) => (
            <button key={channel.id} type="button" className={selected.id === channel.id ? 'quickCard active' : 'quickCard'} onClick={() => selectChannel(channel.id)}>
              <PlayCircle size={18} />
              <span>{channel.name}</span>
              <em>{channel.language}</em>
            </button>
          ))}
        </div>
      </section>

      <section className="toolbar">
        <label className="searchBox">
          <Search size={18} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search channel, region, language…" />
        </label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)} aria-label="Filter channels by language">
          <option>All</option>
          <option>DE</option>
          <option>FR</option>
          <option>IT</option>
          <option>EN</option>
        </select>
        <select value={mode} onChange={(e) => setMode(e.target.value)} aria-label="Filter channels by playback availability">
          <option>All</option>
          <option>Playable</option>
          <option>Favorites</option>
          <option>Listed</option>
        </select>
      </section>

      <div className="filterSummary" aria-live="polite">
        Showing <strong>{filtered.length}</strong> of {allChannels.length} sources
        {(query || language !== 'All' || mode !== 'All') && (
          <button type="button" onClick={resetFilters}>Clear filters</button>
        )}
      </div>

      <section className="watchLayout">
        <Player channel={selected} />
        <aside className="sidePanel">
          <div className="sideCard">
            <p className="eyebrow">Now selected</p>
            <h2>{selected.name}</h2>
            <p>{selected.region} • {selected.language} • {selected.streamUrl ? 'Playable' : 'Official source'}</p>
            <button className={favoriteSet.has(selected.id) ? 'primary' : 'secondary'} type="button" onClick={() => toggleFavorite(selected.id)}>
              <Star size={16} fill={favoriteSet.has(selected.id) ? 'currentColor' : 'none'} /> {favoriteSet.has(selected.id) ? 'Saved' : 'Save favorite'}
            </button>
          </div>
          <div className="sideCard">
            <p className="eyebrow">Recently opened</p>
            {recentChannels.length ? recentChannels.map((channel) => (
              <button key={channel.id} className="miniChannel" type="button" onClick={() => selectChannel(channel.id)}>
                <span>{channel.name}</span><em>{channel.language}</em>
              </button>
            )) : <p className="muted">Open a few channels and they’ll appear here.</p>}
          </div>
        </aside>
      </section>

      <section className="statsRow">
        <div><strong>{allChannels.length}</strong><span>Sources tracked</span></div>
        <div><strong>{playableCount}</strong><span>Native in-app streams</span></div>
        <div><strong>{customChannels.length}</strong><span>Private local entries</span></div>
      </section>

      <section id="private-streams" className="privatePanel">
        <div className="sectionIntro">
          <p className="eyebrow">Private use</p>
          <h2>Add your own stream</h2>
          <p>Paste a personal HLS URL you are allowed to use. It is stored in localStorage on this browser only — not uploaded, proxied, or shared.</p>
        </div>
        <form className="customForm" onSubmit={addCustomChannel}>
          <input value={customName} onChange={(e) => setCustomName(e.target.value)} placeholder="Channel name" aria-label="Private channel name" />
          <input value={customUrl} onChange={(e) => setCustomUrl(e.target.value)} placeholder="https://…/playlist.m3u8" aria-label="Private stream URL" aria-describedby={customError ? 'custom-url-error' : undefined} required />
          <input value={customRegion} onChange={(e) => setCustomRegion(e.target.value)} placeholder="Region" aria-label="Private channel region" />
          <select value={customLanguage} onChange={(e) => setCustomLanguage(e.target.value)} aria-label="Private channel language">
            <option>DE</option>
            <option>FR</option>
            <option>IT</option>
            <option>EN</option>
            <option>DE/FR</option>
            <option>FR/DE</option>
          </select>
          <button className="primary" type="submit"><Plus size={16} /> Add private stream</button>
        </form>
        <div className="privateActions">
          <button className="secondary" type="button" onClick={() => importRef.current?.click()}><Upload size={16} /> Import private list</button>
          <button className="secondary" type="button" onClick={exportPrivateChannels} disabled={customChannels.length === 0}><Download size={16} /> Export private list</button>
          <input ref={importRef} type="file" accept="application/json" hidden onChange={importPrivateChannels} />
        </div>
        {customError && <p id="custom-url-error" className="formError" role="alert">{customError}</p>}
      </section>

      <section className="providerPanel">
        <div className="sectionIntro">
          <p className="eyebrow">How the real Swiss TV apps do it</p>
          <h2>Licensed provider shortcuts</h2>
          <p>Teleboy-style native Swiss TV requires licensed stream access. These services solve that with accounts, channel agreements, replay rights, recording storage, and ad rules.</p>
        </div>
        <div className="providerGrid">
          {legalProviders.map((provider) => (
            <a key={provider.name} className="providerCard" href={provider.url} target="_blank" rel="noreferrer">
              <span>{provider.badge}</span>
              <strong>{provider.name}</strong>
              <p>{provider.highlight}</p>
              <em>Open <ExternalLink size={13} /></em>
            </a>
          ))}
        </div>
      </section>

      <section className="guide">
        {filtered.length === 0 ? (
          <div className="emptyState">
            <Search size={24} />
            <strong>No channels match these filters</strong>
            <span>Try a different language, switch back to All, or clear the search term.</span>
            <button className="primary" type="button" onClick={resetFilters}>Clear filters</button>
          </div>
        ) : filtered.map((channel) => {
          const playable = Boolean(channel.streamUrl);
          return (
            <article key={channel.id} className={`rowCard ${selected.id === channel.id ? 'active' : ''}`}>
              <button
                className="channelSelect"
                type="button"
                aria-label={`Select ${channel.name}`}
                aria-pressed={selected.id === channel.id}
                onClick={() => selectChannel(channel.id)}
              >
                <div className={`logoTile ${playable ? 'playable' : ''}`}>{playable ? <PlayCircle size={22} /> : <Tv size={22} />}</div>
                <div className="rowMain">
                  <div className="rowTitle">
                    <h3>{channel.name}</h3>
                    <span>{channel.language}</span>
                  </div>
                  <p>{channel.description}</p>
                </div>
              </button>
              <div className="rowMeta">
                <span>{channel.region}</span>
                <strong>{channel.custom ? 'Private' : playable ? 'Watch now' : 'Provider needed'}</strong>
                <button
                  className={`favoriteButton ${favoriteSet.has(channel.id) ? 'active' : ''}`}
                  type="button"
                  aria-label={`Toggle ${channel.name} favorite`}
                  onClick={(event) => { event.stopPropagation(); toggleFavorite(channel.id); }}
                >
                  <Star size={16} fill={favoriteSet.has(channel.id) ? 'currentColor' : 'none'} />
                </button>
                {channel.custom && (
                  <button
                    className="favoriteButton danger"
                    type="button"
                    aria-label={`Remove ${channel.name}`}
                    onClick={(event) => { event.stopPropagation(); removeCustomChannel(channel.id); }}
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </section>

      <footer>
        <p><Sparkles size={14} /> Swiss Free TV does not host or retransmit broadcaster content. Channel availability, geo-restrictions, and advertising inside official players are controlled by the broadcasters.</p>
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
