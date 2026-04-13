import { useState } from 'react';
import styles from './ProjectForm.module.css';

interface ProjectFormProps {
  submitLabel: string;
  onSubmit: (name: string, color: string) => void;
  onCancel: () => void;
}

export default function ProjectForm({ submitLabel, onSubmit, onCancel }: ProjectFormProps) {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#1B8C3E');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name, color);
      setName('');
      setColor('#1B8C3E');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nom du projet"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={styles.input}
      />
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className={styles.colorPicker}
      />
      <div className={styles.buttons}>
        <button type="submit" className={styles.submitBtn}>
          {submitLabel}
        </button>
        <button type="button" className={styles.cancelBtn} onClick={onCancel}>
          Annuler
        </button>
      </div>
    </form>
  );
}
