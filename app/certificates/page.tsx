import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { FileText } from 'lucide-react';

export const metadata = {
    title: 'Certificates | Anand Sharma',
};

export default async function CertificatesPage() {
    const dirPath = path.join(process.cwd(), 'public', 'certificates');

    let files: string[] = [];
    try {
        if (fs.existsSync(dirPath)) {
            files = fs.readdirSync(dirPath).filter(file => /\.(png|jpe?g|svg|webp|pdf)$/i.test(file));
        }
    } catch (err) {
        console.error('Directory not found or cannot be read:', err);
    }

    // Generate certificate data from file names
    const certificates = files.map((file) => {
        // remove extension
        const nameExtRemoved = file.replace(/\.[^/.]+$/, "");
        // Replace underscores/dashes with spaces and capitalize
        const cleanName = nameExtRemoved.replace(/[-_]/g, " ");
        const isPdf = file.toLowerCase().endsWith('.pdf');

        return {
            name: cleanName,
            file: file,
            src: `/certificates/${file}`,
            isPdf
        };
    });

    return (
        <>
            <nav className="navbar navbar-scrolled" style={{ position: 'fixed' }}>
                <div className="nav-container">
                    <Link href="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.2rem' }}>←</span>
                        <span className="glow-text">AS</span>
                    </Link>
                    <div className="nav-links">
                        <Link href="/">Back to Portfolio</Link>
                    </div>
                </div>
            </nav>

            <main style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '100vh', paddingLeft: '2rem', paddingRight: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
                <section style={{ opacity: 1, transform: 'none', padding: 0, minHeight: 'auto', display: 'block' }}>
                    <h2>My Certificates</h2>

                    {certificates.length === 0 ? (
                        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
                            <p>No certificates found.</p>
                            <br />
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                Please add images (.png, .jpg, .pdf) to the <code>public/certificates</code> directory to see them appear here automatically.
                            </p>
                        </div>
                    ) : (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                            gap: '2rem'
                        }}>
                            {certificates.map((cert, idx) => (
                                <a key={idx} href={cert.src} target="_blank" rel="noopener noreferrer" className="glass-panel project-card" style={{ display: 'block', textDecoration: 'none' }}>
                                    <div className="project-image-box" style={{ filter: 'none', transform: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', paddingBottom: '4rem' }}>
                                        {cert.isPdf ? (
                                            <div style={{ padding: '2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', color: 'var(--accent-primary)' }}>
                                                <FileText size={80} strokeWidth={1.5} />
                                                <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>View PDF Document</span>
                                            </div>
                                        ) : (
                                            <img
                                                src={cert.src}
                                                alt={cert.name}
                                                style={{
                                                    objectFit: 'contain',
                                                    width: '100%',
                                                    height: '100%',
                                                    filter: 'none',
                                                    transform: 'none',
                                                    background: 'rgba(0,0,0,0.4)',
                                                    padding: '1rem'
                                                }}
                                            />
                                        )}
                                    </div>
                                    <div style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        width: '100%',
                                        padding: '1.5rem',
                                        background: 'var(--bg-panel)',
                                        borderTop: '1px solid var(--border-subtle)',
                                        backdropFilter: 'blur(10px)',
                                        zIndex: 20
                                    }}>
                                        <h3 style={{ margin: 0, fontSize: '1.2rem', textTransform: 'capitalize', color: 'var(--text-main)', letterSpacing: '0.02em', fontWeight: 600 }}>{cert.name}</h3>
                                    </div>
                                </a>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </>
    );
}
