'use client';

import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '@/components/dashboard/Loader';
import { Course } from '@/components/dashboard/courses/types';
import { getCourses, saveCourses } from '@/components/dashboard/courses/data';
import '@/styles/dashboard/gestion-cours.css';

const CoursesManagementPage = () => {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    setCourses(getCourses());
  }, []);

  const handleToggleApproval = (id: string) => {
    setLoading(true);
    setTimeout(() => {
      const updatedCourses = courses.map((course) =>
        course.id === id ? { ...course, isApproved: !course.isApproved } : course
      );
      setCourses(updatedCourses);
      saveCourses(updatedCourses);
      toast.success('Statut d’approbation mis à jour');
      setLoading(false);
    }, 1000);
  };

  const handleDeleteCourse = (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) return;
    setLoading(true);
    setTimeout(() => {
      const updatedCourses = courses.filter((course) => course.id !== id);
      setCourses(updatedCourses);
      saveCourses(updatedCourses);
      toast.success('Cours supprimé avec succès');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="x-courses-page">
      <ToastContainer position="top-right" autoClose={3000} />
      <Loader loading={loading} />
      <h2 className="x-courses-title">Gestion des Formations</h2>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Créateur</th>
              <th>Type de Créateur</th>
              <th>Gratuit</th>
              <th>Certifié</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.title}</td>
                <td>{course.specifiedAuthor || course.creatorEmail}</td>
                <td>{course.creatorType}</td>
                <td>{course.isFree ? 'Oui' : 'Non'}</td>
                <td>{course.isCertified ? 'Oui' : 'Non'}</td>
                <td>{course.isApproved ? 'Approuvé' : 'En attente'}</td>
                <td>
                  <span className="x-action-icon" onClick={() => handleToggleApproval(course.id)}>
                    <i className={`fas ${course.isApproved ? 'fa-times' : 'fa-check'}`}></i>
                    <span className="x-action-tooltip">
                      {course.isApproved ? 'Désapprouver' : 'Approuver'}
                    </span>
                  </span>
                  <span className="x-action-icon" onClick={() => handleDeleteCourse(course.id)}>
                    <i className="fas fa-trash"></i>
                    <span className="x-action-tooltip">Supprimer</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoursesManagementPage;