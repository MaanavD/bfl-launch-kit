interface AuthorNoteProps {
  label: string;
  heading: string;
  children: React.ReactNode;
}

export default function AuthorNote({ label, heading, children }: AuthorNoteProps) {
  return (
    <aside className="author-note">
      <div className="author-note-inner">
        <p className="author-note-label">{label}</p>
        <p className="author-note-heading">{heading}</p>
        <div className="author-note-body">{children}</div>
        <p className="author-note-sig">- Maanav</p>
      </div>
    </aside>
  );
}
